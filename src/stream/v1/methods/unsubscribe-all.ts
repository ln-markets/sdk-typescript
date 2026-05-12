import type { StreamInstance } from '../instance.js'
import type { Topic } from '../types.js'

export interface UnsubscribeAllOutput {
  unsubscribed: Topic[]
}

export type UnsubscribeAll = () => Promise<UnsubscribeAllOutput>

export const createUnsubscribeAll = (
  instance: Readonly<StreamInstance>
): UnsubscribeAll => {
  return async () => {
    return instance.request<UnsubscribeAllOutput>({
      method: 'unsubscribeAll',
    })
  }
}
