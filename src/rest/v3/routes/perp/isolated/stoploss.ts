import type { KyInstance } from 'ky'

import type {
  PerpMarketKey,
  PerpOpenOrRunningTrade,
  PerpStoploss,
} from '../types.js'

export interface PerpIsolatedUpdateStoplossInput extends PerpMarketKey {
  id: string
  stoploss: PerpStoploss
}

export type PerpIsolatedUpdateStoplossOutput = PerpOpenOrRunningTrade

type UpdateStoploss = (
  input: Readonly<PerpIsolatedUpdateStoplossInput>
) => Promise<PerpIsolatedUpdateStoplossOutput>

export const createUpdateStoploss = (
  instance: Readonly<KyInstance>
): UpdateStoploss => {
  return async ({ id, instrument, pair, stoploss }) => {
    return instance
      .put('perp/isolated/trade/stoploss', {
        json: { id, instrument, pair, stoploss },
      })
      .json()
  }
}

export interface PerpIsolatedRemoveStoplossInput extends PerpMarketKey {
  id: string
}

export type PerpIsolatedRemoveStoplossOutput = PerpOpenOrRunningTrade

type RemoveStoploss = (
  input: Readonly<PerpIsolatedRemoveStoplossInput>
) => Promise<PerpIsolatedRemoveStoplossOutput>

export const createRemoveStoploss = (
  instance: Readonly<KyInstance>
): RemoveStoploss => {
  return async ({ id, instrument, pair }) => {
    return instance
      .delete('perp/isolated/trade/stoploss', {
        searchParams: { id, instrument, pair },
      })
      .json()
  }
}
