import type { KyInstance } from 'ky'

import type {
  PaginationInput,
  FuturesCanceledTrade,
  FuturesClosedTrade,
} from '../../../types.js'

export type FuturesIsolatedGetClosedTradesInput = PaginationInput

export type FuturesIsolatedGetClosedTradesOutput = (
  | FuturesCanceledTrade
  | FuturesClosedTrade
)[]

type GetClosedTrades = (
  input?: FuturesIsolatedGetClosedTradesInput
) => Promise<FuturesIsolatedGetClosedTradesOutput>

export const createGetClosedTrades = (
  instance: KyInstance
): GetClosedTrades => {
  return async ({ from, limit, to } = {}) => {
    return instance
      .get('futures/isolated/trades/closed', {
        searchParams: { from, limit, to },
      })
      .json()
  }
}
