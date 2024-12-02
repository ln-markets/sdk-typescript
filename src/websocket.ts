import { randomBytes } from 'node:crypto'
import Websocket from 'ws'

import { getHostname } from './utils.js'

export type WebsocketClient = Awaited<ReturnType<typeof createWebsocketClient>>

type WebsocketClientOptions = {
  heartbeat?: boolean
  network?: 'mainnet' | 'testnet'
}

type WebsocketResponse = {
  error?: unknown
  id: string
  jsonrpc: string
  method: string
  params?: Record<string, unknown>
  result?: unknown
}

export const createWebsocketClient = async (
  options: WebsocketClientOptions = {}
) => {
  const {
    heartbeat = true,
    network = process.env.LNM_API_NETWORK ?? 'mainnet',
  } = options

  const ws = await new Promise<Websocket>((resolve, reject) => {
    const hostname = process.env.LNM_API_HOSTNAME ?? getHostname(network)
    const url = `wss://${hostname}`

    const ws = new Websocket(url)
    ws.once('error', reject)
    ws.once('open', () => {
      resolve(ws)
    })
  })

  if (heartbeat) {
    ws.ping()

    ws.on('pong', () => {
      setTimeout(() => {
        ws.ping()
      }, 5000)
    })
  }

  ws.on('message', (data) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-base-to-string
      const response = JSON.parse(data.toString()) as WebsocketResponse

      const { error, id, method, params, result } = response
      ws.emit('response', response)

      if (method === 'subscription' && params) {
        const { channel, data } = params as { channel: string; data: unknown }
        ws.emit(channel, data)
      } else if (id) {
        ws.emit(id, result, error)
      }
    } catch {
      ws.emit('error', data)
    }
  })

  const disconnect = () => {
    ws.close()
  }

  const send = (
    method: string,
    params?: number | Record<string, any> | string
  ) => {
    if (ws.readyState !== 1) {
      throw new Error('Websocket Client is not connected')
    }

    const payload = {
      id: randomBytes(16).toString('hex'),
      jsonrpc: '2.0',
      method,
      params,
    }

    return new Promise<unknown>((resolve, reject) => {
      const done = (result: any, error: any) => {
        if (error) {
          console.log('error', error)
          if (typeof error === 'string') {
            reject(new Error(error))
          } else if (error instanceof Error) {
            reject(error)
          } else {
            reject(new Error('Unknown error'))
          }
        } else {
          resolve(result)
        }
      }

      ws.send(JSON.stringify(payload), (error) => {
        if (error) {
          reject(error)
        }

        ws.once(payload.id, done)
      })
    })
  }

  const ping = () => {
    return send(`v1/public/ping`) as Promise<string>
  }

  const getChannels = () => {
    return send(`v1/public/channels`) as Promise<string[]>
  }

  const subscribe = (channels: string[]) => {
    return send(`v1/public/subscribe`, channels) as Promise<string[]>
  }

  const unsubscribe = (channels: string[]) => {
    return send(`v1/public/unsubscribe`, channels) as Promise<string[]>
  }

  return {
    disconnect,
    getChannels,
    ping,
    send,
    subscribe,
    unsubscribe,
    ws,
  }
}
