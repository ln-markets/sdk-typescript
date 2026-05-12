import type { KyInstance } from 'ky'
import type { FuturesCanceledTrade } from '../../../types.js'

export type FuturesIsolatedCancelAllOutput = FuturesCanceledTrade

type CancelAll = () => Promise<FuturesIsolatedCancelAllOutput>

export const createCancelAll = (instance: KyInstance): CancelAll => {
  return async () => {
    return instance.post('futures/isolated/trades/cancel-all').json()
  }
}
