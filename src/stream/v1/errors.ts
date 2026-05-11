/* oxlint-disable eslint/max-classes-per-file */

export class StreamDisconnectedError extends Error {
  public constructor(method: string) {
    super(`Cannot call ${method}(): WebSocket is not connected`)
    this.name = 'StreamDisconnectedError'
  }
}

export class ReconnectFailedError extends Error {
  public readonly attempts: number

  public constructor(attempts: number) {
    super(`WebSocket reconnect failed after ${attempts} attempt(s)`)
    this.name = 'ReconnectFailedError'
    this.attempts = attempts
  }
}

export class StreamRequestTimeoutError extends Error {
  public readonly method: string

  public constructor(method: string) {
    super(`Request timed out after 10s (method: ${method})`)
    this.name = 'StreamRequestTimeoutError'
    this.method = method
  }
}

export class StreamRpcError extends Error {
  public readonly code: number
  public readonly data: unknown

  public constructor(code: number, message: string, data?: unknown) {
    super(message)
    this.name = 'StreamRpcError'
    this.code = code
    this.data = data
  }
}
