import type { KyInstance } from 'ky'

import type { PerpMarketFilter, PerpRunningTrade } from '../types.js'

export type PerpIsolatedGetRunningTradesInput = PerpMarketFilter

// `pl` is the unrealized P&L at the Mark price, null when no Mark price is known.
export type PerpIsolatedGetRunningTradesOutput = (Omit<
  PerpRunningTrade,
  'pl'
> & {
  pl: number | null
})[]

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
