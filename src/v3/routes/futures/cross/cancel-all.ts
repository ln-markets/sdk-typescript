import type { KyInstance } from 'ky'
import type { FuturesCrossCanceledOrder } from '../../../types.js'

export type FuturesCrossCancelAllOutput = FuturesCrossCanceledOrder[]

type CancelAll = () => Promise<FuturesCrossCancelAllOutput>

export const createCancelAll = (instance: KyInstance): CancelAll => {
  return async () => {
    return instance.post('futures/cross/orders/cancel-all').json()
  }
}
