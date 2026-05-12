import type { KyInstance } from 'ky'
import type { FuturesOpenOrRunningTrade } from '../../../types.js'

export interface FuturesIsolatedUpdateTakeprofitInput {
  id: string
  value: number
}

export type FuturesIsolatedUpdateTakeprofitOutput = FuturesOpenOrRunningTrade

type UpdateTakeprofit = (
  input: FuturesIsolatedUpdateTakeprofitInput
) => Promise<FuturesIsolatedUpdateTakeprofitOutput>

export const createUpdateTakeprofit = (
  instance: KyInstance
): UpdateTakeprofit => {
  return async ({ id, value }) => {
    return instance
      .put('futures/isolated/trade/takeprofit', { json: { id, value } })
      .json()
  }
}
