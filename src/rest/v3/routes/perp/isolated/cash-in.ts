import type { KyInstance } from 'ky'

import type { PerpMarketKey, PerpRunningTrade } from '../types.js'

export interface PerpIsolatedCashInInput extends PerpMarketKey {
  amount: number
  id: string
}

export type PerpIsolatedCashInOutput = PerpRunningTrade

type CashIn = (
  input: Readonly<PerpIsolatedCashInInput>
) => Promise<PerpIsolatedCashInOutput>

export const createCashIn = (instance: Readonly<KyInstance>): CashIn => {
  return async ({ amount, id, instrument, pair }) => {
    return instance
      .post('perp/isolated/trade/cash-in', {
        json: { amount, id, instrument, pair },
      })
      .json()
  }
}
