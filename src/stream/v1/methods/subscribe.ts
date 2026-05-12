import type { StreamInstance } from '../instance.js'
import type { Topic } from '../types.js'

export interface SubscribeInput {
  topics: Topic[]
}

export interface SubscribeOutput {
  subscribed: Topic[]
}

export type Subscribe = (input: SubscribeInput) => Promise<SubscribeOutput>

export const createSubscribe = (instance: StreamInstance): Subscribe => {
  return async ({ topics }) => {
    return instance.request<SubscribeOutput>({
      method: 'subscribe',
      params: { topics },
    })
  }
}
