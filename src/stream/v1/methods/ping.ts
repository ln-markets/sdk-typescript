import type { StreamInstance } from '../instance.js'

export type PingOutput = 'pong'

export type Ping = () => Promise<PingOutput>

export const createPing = (instance: Readonly<StreamInstance>): Ping => {
  return async () => {
    return instance.request<PingOutput>({ method: 'ping' })
  }
}
