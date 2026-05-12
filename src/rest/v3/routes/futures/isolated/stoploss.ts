import type { KyInstance } from 'ky'
import type { FuturesOpenOrRunningTrade } from '../../../types.js'

export interface FuturesIsolatedUpdateStoplossInput {
  id: string
  value: number
}

export type FuturesIsolatedUpdateStoplossOutput = FuturesOpenOrRunningTrade

type UpdateStoploss = (
  input: FuturesIsolatedUpdateStoplossInput
) => Promise<FuturesIsolatedUpdateStoplossOutput>

export const createUpdateStoploss = (instance: KyInstance): UpdateStoploss => {
  return async ({ id, value }) => {
    return instance
      .put('futures/isolated/trade/stoploss', { json: { id, value } })
      .json()
  }
}
