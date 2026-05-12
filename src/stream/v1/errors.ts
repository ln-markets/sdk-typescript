/* oxlint-disable eslint/max-classes-per-file */

export class StreamDisconnectedError extends Error {
  constructor(method: string) {
    super(`Cannot call ${method}(): WebSocket is not connected`)
    this.name = 'StreamDisconnectedError'
  }
}

export class ReconnectFailedError extends Error {
  readonly attempts: number

  constructor(attempts: number) {
    super(`WebSocket reconnect failed after ${attempts} attempt(s)`)
    this.name = 'ReconnectFailedError'
    this.attempts = attempts
  }
}

export class StreamRequestTimeoutError extends Error {
  readonly method: string

  constructor(method: string) {
    super(`Request timed out after 10s (method: ${method})`)
    this.name = 'StreamRequestTimeoutError'
    this.method = method
  }
}

export class StreamRpcError extends Error {
  readonly code: number
  readonly data: unknown

  constructor(code: number, message: string, data?: unknown) {
    super(message)
    this.name = 'StreamRpcError'
    this.code = code
    this.data = data
  }
}
