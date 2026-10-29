import type { KyInstance } from 'ky'

import { toPerpPageSearchParams } from '../search-params.js'
import type {
  PerpCanceledTrade,
  PerpMarketFilter,
  PerpPaginatedResponse,
  PerpPaginationInput,
} from '../types.js'

export type PerpIsolatedGetCanceledTradesInput = PerpMarketFilter &
  PerpPaginationInput

export type PerpIsolatedGetCanceledTradesOutput =
  PerpPaginatedResponse<PerpCanceledTrade>

type GetCanceledTrades = (
  input?: Readonly<PerpIsolatedGetCanceledTradesInput>
) => Promise<PerpIsolatedGetCanceledTradesOutput>

export const createGetCanceledTrades = (
  instance: Readonly<KyInstance>
): GetCanceledTrades => {
  return async ({ instrument, pair, ...page } = {}) => {
    return instance
      .get('perp/isolated/trades/canceled', {
        searchParams: { instrument, pair, ...toPerpPageSearchParams(page) },
      })
      .json()
  }
}
