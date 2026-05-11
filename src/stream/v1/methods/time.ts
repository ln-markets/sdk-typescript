import type { StreamInstance } from '../instance.js'

export interface TimeOutput {
  time: number
}

export type Time = () => Promise<TimeOutput>

export const createTime = (instance: Readonly<StreamInstance>): Time => {
  return async () => {
    return instance.request<TimeOutput>({ method: 'time' })
  }
}
