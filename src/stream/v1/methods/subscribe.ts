import type { StreamInstance } from '../instance.js'
import type { Topic } from '../types.js'

export interface SubscribeInput {
  readonly topics: readonly Topic[]
}

export interface SubscribeOutput {
  subscribed: Topic[]
}

export type Subscribe = (
  input: Readonly<SubscribeInput>
) => Promise<SubscribeOutput>

export const createSubscribe = (
  instance: Readonly<StreamInstance>
): Subscribe => {
  return async ({ topics }) => {
    return instance.request<SubscribeOutput>({
      method: 'subscribe',
      params: { topics },
    })
  }
}
