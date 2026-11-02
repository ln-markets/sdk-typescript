import type { KyInstance } from 'ky'

import type { PerpMarketFilter, PerpRunningTradeRead } from '../types.js'

export type PerpIsolatedGetRunningTradesInput = PerpMarketFilter

export type PerpIsolatedGetRunningTradesOutput = PerpRunningTradeRead[]

type GetRunningTrades = (
  input?: Readonly<PerpIsolatedGetRunningTradesInput>
) => Promise<PerpIsolatedGetRunningTradesOutput>

export const createGetRunningTrades = (
  instance: Readonly<KyInstance>
): GetRunningTrades => {
  return async ({ instrument, pair } = {}) => {
    return instance
      .get('perp/isolated/trades/running', {
        searchParams: { instrument, pair },
      })
      .json()
  }
}
