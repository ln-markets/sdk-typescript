import type { KyInstance } from 'ky'

type Time = () => Promise<number>

export const createTimeRoute = (instance: KyInstance): Time => {
  return async () => {
    return instance.get('time').json()
  }
}
