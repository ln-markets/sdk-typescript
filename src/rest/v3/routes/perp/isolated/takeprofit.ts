import type { KyInstance } from 'ky'

import type { PerpMarketKey, PerpOpenOrRunningTrade } from '../types.js'

export interface PerpIsolatedUpdateTakeprofitInput extends PerpMarketKey {
  id: string
  value: number
}

export type PerpIsolatedUpdateTakeprofitOutput = PerpOpenOrRunningTrade

type UpdateTakeprofit = (
  input: Readonly<PerpIsolatedUpdateTakeprofitInput>
) => Promise<PerpIsolatedUpdateTakeprofitOutput>

export const createUpdateTakeprofit = (
  instance: Readonly<KyInstance>
): UpdateTakeprofit => {
  return async ({ id, instrument, pair, value }) => {
    return instance
      .put('perp/isolated/trade/takeprofit', {
        json: { id, instrument, pair, value },
      })
      .json()
  }
}

export interface PerpIsolatedRemoveTakeprofitInput extends PerpMarketKey {
  id: string
}

export type PerpIsolatedRemoveTakeprofitOutput = PerpOpenOrRunningTrade

type RemoveTakeprofit = (
  input: Readonly<PerpIsolatedRemoveTakeprofitInput>
) => Promise<PerpIsolatedRemoveTakeprofitOutput>

export const createRemoveTakeprofit = (
  instance: Readonly<KyInstance>
): RemoveTakeprofit => {
  return async ({ id, instrument, pair }) => {
    return instance
      .delete('perp/isolated/trade/takeprofit', {
        searchParams: { id, instrument, pair },
      })
      .json()
  }
}
