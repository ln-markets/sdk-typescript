import type { KyInstance } from 'ky'

import type { FuturesRunningTrade } from '../../../types.js'

export interface FuturesIsolatedAddMarginInput {
  amount: number
  id: string
}

export type FuturesIsolatedAddMarginOutput = FuturesRunningTrade

type AddMargin = (
  input: Readonly<FuturesIsolatedAddMarginInput>
) => Promise<FuturesIsolatedAddMarginOutput>

export const createAddMargin = (instance: Readonly<KyInstance>): AddMargin => {
  return async ({ amount, id }) => {
    return instance
      .post('futures/isolated/trade/add-margin', { json: { amount, id } })
      .json()
  }
}
