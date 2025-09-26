import type { KyInstance } from 'ky'

export type PingOutput = 'pong'

type Ping = () => Promise<PingOutput>

export const createPing = (instance: KyInstance): Ping => {
  return async () => {
    return instance.get('ping').json()
  }
}
