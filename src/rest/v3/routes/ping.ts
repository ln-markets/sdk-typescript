import type { KyInstance } from 'ky'

type Ping = () => Promise<'pong'>

export const createPing = (instance: Readonly<KyInstance>): Ping => {
  return async () => {
    return instance.get('ping').json<'pong'>()
  }
}
