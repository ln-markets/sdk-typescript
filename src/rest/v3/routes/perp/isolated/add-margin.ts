import type { KyInstance } from 'ky'

import type { PerpMarketKey, PerpRunningTrade } from '../types.js'

export interface PerpIsolatedAddMarginInput extends PerpMarketKey {
  amount: number
  id: string
}

export type PerpIsolatedAddMarginOutput = PerpRunningTrade

type AddMargin = (
  input: Readonly<PerpIsolatedAddMarginInput>
) => Promise<PerpIsolatedAddMarginOutput>

export const createAddMargin = (instance: Readonly<KyInstance>): AddMargin => {
  return async ({ amount, id, instrument, pair }) => {
    return instance
      .post('perp/isolated/trade/add-margin', {
        json: { amount, id, instrument, pair },
      })
      .json()
  }
}
