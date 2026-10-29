import type { KyInstance } from 'ky'

import type { PerpMarketFilter, PerpOpenTrade } from '../types.js'

export type PerpIsolatedGetOpenTradesInput = PerpMarketFilter

export type PerpIsolatedGetOpenTradesOutput = PerpOpenTrade[]

type GetOpenTrades = (
  input?: Readonly<PerpIsolatedGetOpenTradesInput>
) => Promise<PerpIsolatedGetOpenTradesOutput>

export const createGetOpenTrades = (
  instance: Readonly<KyInstance>
): GetOpenTrades => {
  return async ({ instrument, pair } = {}) => {
    return instance
      .get('perp/isolated/trades/open', { searchParams: { instrument, pair } })
      .json()
  }
}
