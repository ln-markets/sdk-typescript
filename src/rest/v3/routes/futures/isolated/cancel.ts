import type { KyInstance } from 'ky'
import type { FuturesCanceledTrade } from '../../../types.js'

export interface FuturesIsolatedCancelTradeInput {
  id: string
}

export type FuturesIsolatedCancelOutput = FuturesCanceledTrade

type Cancel = (
  input: Readonly<FuturesIsolatedCancelTradeInput>
) => Promise<FuturesIsolatedCancelOutput>

export const createCancel = (instance: Readonly<KyInstance>): Cancel => {
  return async ({ id }) => {
    return instance
      .post('futures/isolated/trade/cancel', { json: { id } })
      .json()
  }
}
