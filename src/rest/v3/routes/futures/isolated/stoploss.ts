import type { KyInstance } from 'ky'

import type {
  FuturesOpenOrRunningTrade,
  FuturesStoplossMode,
} from '../../../types.js'

export interface FuturesIsolatedUpdateStoplossInput {
  id: string
  value: number
  mode?: FuturesStoplossMode
}

export type FuturesIsolatedUpdateStoplossOutput = FuturesOpenOrRunningTrade

type UpdateStoploss = (
  input: Readonly<FuturesIsolatedUpdateStoplossInput>
) => Promise<FuturesIsolatedUpdateStoplossOutput>

export const createUpdateStoploss = (
  instance: Readonly<KyInstance>
): UpdateStoploss => {
  return async ({ id, value, mode }) => {
    return instance
      .put('futures/isolated/trade/stoploss', { json: { id, value, mode } })
      .json()
  }
}

export interface FuturesIsolatedRemoveStoplossInput {
  id: string
}

export type FuturesIsolatedRemoveStoplossOutput = FuturesOpenOrRunningTrade

type RemoveStoploss = (
  input: Readonly<FuturesIsolatedRemoveStoplossInput>
) => Promise<FuturesIsolatedRemoveStoplossOutput>

export const createRemoveStoploss = (
  instance: Readonly<KyInstance>
): RemoveStoploss => {
  return async ({ id }) => {
    return instance
      .delete('futures/isolated/trade/stoploss', { searchParams: { id } })
      .json()
  }
}
