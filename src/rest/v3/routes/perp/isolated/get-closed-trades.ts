import type { KyInstance } from 'ky'

import { toPerpPageSearchParams } from '../search-params.js'
import type {
  PerpClosedTrade,
  PerpMarketFilter,
  PerpPaginatedResponse,
  PerpPaginationInput,
} from '../types.js'

export type PerpIsolatedGetClosedTradesInput = PerpMarketFilter &
  PerpPaginationInput

export type PerpIsolatedGetClosedTradesOutput =
  PerpPaginatedResponse<PerpClosedTrade>

type GetClosedTrades = (
  input?: Readonly<PerpIsolatedGetClosedTradesInput>
) => Promise<PerpIsolatedGetClosedTradesOutput>

export const createGetClosedTrades = (
  instance: Readonly<KyInstance>
): GetClosedTrades => {
  return async ({ instrument, pair, ...page } = {}) => {
    return instance
      .get('perp/isolated/trades/closed', {
        searchParams: { instrument, pair, ...toPerpPageSearchParams(page) },
      })
      .json()
  }
}
