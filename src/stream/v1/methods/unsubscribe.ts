import type { StreamInstance } from '../instance.js'
import type { Topic } from '../types.js'

export interface UnsubscribeInput {
  readonly topics: readonly Topic[]
}

export interface UnsubscribeOutput {
  unsubscribed: Topic[]
}

export type Unsubscribe = (
  input: Readonly<UnsubscribeInput>
) => Promise<UnsubscribeOutput>

export const createUnsubscribe = (
  instance: Readonly<StreamInstance>
): Unsubscribe => {
  return async ({ topics }) => {
    return instance.request<UnsubscribeOutput>({
      method: 'unsubscribe',
      params: { topics },
    })
  }
}
