import type { KyInstance } from 'ky'

type Ping = () => Promise<'pong'>

export const createPing = (instance: KyInstance): Ping => {
  return async () => {
    return instance.get('ping').json<'pong'>()
  }
}
