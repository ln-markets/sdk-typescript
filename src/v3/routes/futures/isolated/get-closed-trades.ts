import type { KyInstance } from 'ky'

import type {
  PaginatedResponse,
  PaginationInput,
  FuturesCanceledTrade,
  FuturesClosedTrade,
} from '../../../types.js'

export type FuturesIsolatedGetClosedTradesInput = PaginationInput

export type FuturesIsolatedGetClosedTradesOutput = PaginatedResponse<
  FuturesCanceledTrade | FuturesClosedTrade
>

type GetClosedTrades = (
  input?: FuturesIsolatedGetClosedTradesInput
) => Promise<FuturesIsolatedGetClosedTradesOutput>

export const createGetClosedTrades = (
  instance: KyInstance
): GetClosedTrades => {
  return async ({ cursor, from, limit, to } = {}) => {
    return instance
      .get('futures/isolated/trades/closed', {
        searchParams: { cursor, from, limit, to },
      })
      .json()
  }
}
