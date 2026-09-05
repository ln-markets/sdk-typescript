import { randomBytes } from 'node:crypto'

import { EventEmitter } from 'eventemitter3'
import { match, P } from 'ts-pattern'
import WebSocket from 'ws'

import {
  ReconnectFailedError,
  StreamDisconnectedError,
  StreamRequestTimeoutError,
  StreamRpcError,
} from './errors.js'
import type { Options, StreamEvents, Topic } from './types.js'

export type ConnectionState =
  | 'disconnected'
  | 'connecting'
  | 'connected'
  | 'reconnecting'

interface PendingRequest {
  resolve: (value: unknown) => void
  reject: (reason: unknown) => void
  timer: ReturnType<typeof setTimeout>
}

interface JsonRpcResponseFrame {
  id: string
  result?: unknown
  error?: { code: number; message: string; data?: unknown }
}

const REQUEST_TIMEOUT_MS = 10_000

export class StreamInstance extends EventEmitter<StreamEvents> {
  readonly #url: string
  readonly #reconnectInterval: number
  readonly #maxReconnectAttempts: number
  readonly #reconnectEnabled: boolean

  // oxlint-disable-next-line unicorn/no-null -- null = explicit "no resource held" sentinel (project convention for handles/timers)
  #ws: WebSocket | null = null
  #state: ConnectionState = 'disconnected'
  // oxlint-disable-next-line unicorn/no-null -- null = explicit "no timer scheduled" sentinel (project convention for handles/timers)
  #reconnectTimer: ReturnType<typeof setTimeout> | null = null
  #reconnectAttempts = 0
  #userInitiatedClose = false
  readonly #pending = new Map<string, PendingRequest>()

  public get state(): ConnectionState {
    return this.#state
  }

  public constructor({
    network = 'mainnet',
    reconnectInterval = 5000,
    maxReconnectAttempts = 5,
    reconnectEnabled = true,
  }: Readonly<Options> = {}) {
    super()
    const wssUrl = match(network)
      .with('mainnet', () => 'wss://stream.lnmarkets.com/v1')
      .with('signet', () => 'wss://stream.signet.lnmarkets.com/v1')
      .exhaustive()
    this.#url = wssUrl
    this.#reconnectInterval = reconnectInterval
    this.#maxReconnectAttempts = maxReconnectAttempts
    this.#reconnectEnabled = reconnectEnabled
  }

  public async connect(): Promise<void> {
    if (this.#state !== 'disconnected') {
      throw new Error(`Cannot connect(): state is '${this.#state}'`)
    }
    this.#userInitiatedClose = false
    await this.#openWebSocket()
  }

  public close(): void {
    this.#userInitiatedClose = true
    if (this.#reconnectTimer !== null) {
      clearTimeout(this.#reconnectTimer)
      // oxlint-disable-next-line unicorn/no-null -- null = "no timer scheduled" sentinel (project convention)
      this.#reconnectTimer = null
    }
    if (this.#ws !== null && this.#state !== 'disconnected') {
      this.#ws.close(1000)
    }
    this.#state = 'disconnected'
  }

  public send(payload: string): void {
    if (this.#state !== 'connected' || this.#ws === null) {
      throw new StreamDisconnectedError('send')
    }
    this.#ws.send(payload)
  }

  // oxlint-disable-next-line typescript/promise-function-async -- intentional: returns rejected promise synchronously when not connected
  public request<TResult>({
    method,
    params,
  }: Readonly<{
    method: string
    params?: unknown
  }>): Promise<TResult> {
    if (this.#state !== 'connected') {
      return Promise.reject(new StreamDisconnectedError('request'))
    }
    const id = randomBytes(8).toString('hex')
    return new Promise<TResult>((resolve, reject) => {
      const timer = setTimeout(() => {
        this.removeAllListeners(`response:${id}`)
        this.#pending.delete(id)
        reject(new StreamRequestTimeoutError(method))
      }, REQUEST_TIMEOUT_MS)

      this.#pending.set(id, {
        // oxlint-disable-next-line typescript/no-unsafe-type-assertion -- widening cast: Promise<TResult> resolve stored as (value: unknown) => void
        resolve: resolve as (value: unknown) => void,
        reject,
        timer,
      })

      this.once(`response:${id}`, (frame) => {
        // oxlint-disable-next-line typescript/no-unsafe-type-assertion -- response event carries JsonRpcResponseFrame via index-signature unknown[]
        const response = frame as JsonRpcResponseFrame
        clearTimeout(timer)
        this.#pending.delete(id)
        if (response.error) {
          reject(
            new StreamRpcError(
              response.error.code,
              response.error.message,
              response.error.data
            )
          )
          return
        }
        // oxlint-disable-next-line typescript/no-unsafe-type-assertion -- result is TResult by JSON-RPC contract; narrowed via caller type parameter
        resolve(response.result as TResult)
      })

      try {
        this.send(JSON.stringify({ jsonrpc: '2.0', id, method, params }))
      } catch (error) {
        clearTimeout(timer)
        this.removeAllListeners(`response:${id}`)
        this.#pending.delete(id)
        // oxlint-disable-next-line typescript/prefer-promise-reject-errors -- error originates from send() which throws StreamDisconnectedError (an Error); re-thrown as-is
        reject(error)
      }
    })
  }

  // oxlint-disable-next-line typescript/promise-function-async -- intentional: Promise constructor pattern required for event setup; async would lose access to the reject in callbacks
  #openWebSocket(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.#state = this.#reconnectAttempts > 0 ? 'reconnecting' : 'connecting'
      const ws = new WebSocket(this.#url)
      this.#ws = ws
      let opened = false

      const handleOpen = (): void => {
        opened = true
        const wasReconnecting = this.#reconnectAttempts > 0
        const attempts = this.#reconnectAttempts
        this.#state = 'connected'
        this.#reconnectAttempts = 0
        this.emit('open')
        if (wasReconnecting) {
          this.emit('reconnected', { attempts })
        }
        resolve()
      }

      ws.once('open', handleOpen)

      // oxlint-disable-next-line typescript/prefer-readonly-parameter-types -- ws library callback signature; we only read from `data`
      ws.on('message', (data: Buffer) => {
        this.#onMessage(data.toString('utf8'))
      })

      // oxlint-disable-next-line typescript/prefer-readonly-parameter-types -- ws library callback signature; we only read `error.message`
      ws.on('error', (error) => {
        if (!opened) {
          // Pre-open error path: route through the close handler below.
          // The ws library emits close right after a pre-open error event, and
          // The single close handler centralises rejection + reconnect logic.
          return
        }
        this.emit('error', error)
      })

      // oxlint-disable-next-line typescript/prefer-readonly-parameter-types -- ws library callback signature; we only read `reasonBuf`
      ws.on('close', (code: number, reasonBuf: Buffer) => {
        const reason = reasonBuf.toString('utf8')
        const wasUserInitiated = this.#userInitiatedClose
        const wasReconnectAttempt = this.#reconnectAttempts > 0
        // oxlint-disable-next-line unicorn/no-null -- null = "no socket held" sentinel (project convention)
        this.#ws = null
        this.#state = 'disconnected'
        this.emit('close', code, reason)
        this.#rejectPending()
        if (!opened) {
          reject(new Error(`WebSocket closed before open (code=${code})`))
          // Initial connect failure: caller already saw reject; do NOT auto-
          // Reconnect in the background — that would orphan a live socket the
          // Caller believes is dead. Only mid-cycle reconnect attempts (where
          // The wasReconnectAttempt path falls through to schedule next try.
          if (!wasReconnectAttempt) {
            return
          }
        }
        if (!wasUserInitiated && code !== 1000 && this.#shouldReconnect()) {
          this.#scheduleReconnect()
        }
      })
    })
  }

  #onMessage(payload: string): void {
    // oxlint-disable-next-line init-declarations -- must declare before try/catch to use parsed after the block
    let parsed: unknown
    try {
      parsed = JSON.parse(payload)
    } catch (error) {
      this.emit('error', new Error(`Malformed message: ${String(error)}`))
      return
    }

    match(parsed)
      .with(
        { method: 'subscription', params: { topic: P.string, data: P.any } },
        ({ params }) => {
          // oxlint-disable-next-line typescript/no-unsafe-type-assertion -- topic narrowed via Topic cast; data cast required for TypedEmitter mapped-key emit
          this.emit(params.topic as Topic, params.data as never)
        }
      )
      .with({ id: P.string }, (frame) => {
        this.emit(`response:${frame.id}`, frame)
      })
      .otherwise(() => {
        this.emit('error', new Error('Unknown JSON-RPC frame'))
      })
  }

  #shouldReconnect(): boolean {
    return this.#reconnectEnabled && !this.#userInitiatedClose
  }

  #scheduleReconnect(): void {
    if (this.#reconnectAttempts >= this.#maxReconnectAttempts) {
      this.emit('error', new ReconnectFailedError(this.#reconnectAttempts))
      this.#state = 'disconnected'
      return
    }
    this.#state = 'reconnecting'
    this.#reconnectTimer = setTimeout(() => {
      // oxlint-disable-next-line unicorn/no-null -- null = "no timer scheduled" sentinel (project convention)
      this.#reconnectTimer = null
      this.#reconnectAttempts += 1
      this.#openWebSocket().catch(() => {
        // Pre-open error path: handled inside #openWebSocket via #scheduleReconnect retry
      })
    }, this.#reconnectInterval)
  }

  #rejectPending(): void {
    for (const [id, { reject, timer }] of this.#pending) {
      clearTimeout(timer)
      this.removeAllListeners(`response:${id}`)
      reject(new StreamDisconnectedError('pending request'))
    }
    this.#pending.clear()
  }
}
