import type { KyInstance } from 'ky'
import type { FuturesCrossCanceledOrder } from '../../../types.js'

export interface FuturesCrossCancelOrderInput {
  id: string
}

export type FuturesCrossCancelOutput = FuturesCrossCanceledOrder

type Cancel = (
  input: FuturesCrossCancelOrderInput
) => Promise<FuturesCrossCancelOutput>

export const createCancel = (instance: KyInstance): Cancel => {
  return async ({ id }) => {
    return instance.post('futures/cross/order/cancel', { json: { id } }).json()
  }
}
