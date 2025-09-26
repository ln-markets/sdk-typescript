import type { KyInstance } from 'ky'

export interface TimeOutput {
  time: string
}

type Time = () => Promise<TimeOutput>

export const createTimeRoute = (instance: KyInstance): Time => {
  return async () => {
    return instance.get('time').json()
  }
}
