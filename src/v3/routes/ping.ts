import type { KyInstance } from 'ky'

type Ping = () => Promise<string>

export const createPing = (instance: KyInstance): Ping => {
  return async () => {
    return instance.get('ping').text()
  }
}
