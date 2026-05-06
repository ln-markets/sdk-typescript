import type { KyInstance } from 'ky'
import type { FuturesRunningTrade } from '../../../types.js'

export interface FuturesIsolatedCashInInput {
  amount: number
  id: string
}

export type FuturesIsolatedCashInOutput = FuturesRunningTrade

type CashIn = (
  input: FuturesIsolatedCashInInput
) => Promise<FuturesIsolatedCashInOutput>

export const createCashIn = (instance: KyInstance): CashIn => {
  return async ({ amount, id }) => {
    return instance
      .post('futures/isolated/trade/cash-in', { json: { amount, id } })
      .json()
  }
}
