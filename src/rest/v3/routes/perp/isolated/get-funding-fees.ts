import type { KyInstance } from 'ky'

import { toPerpPageSearchParams } from '../search-params.js'
import type {
  PerpFundingFees,
  PerpMarketFilter,
  PerpPaginatedResponse,
  PerpPaginationInput,
} from '../types.js'

export type PerpIsolatedGetFundingFeesInput = PerpMarketFilter &
  PerpPaginationInput & {
    tradeId?: string
  }

export type PerpIsolatedGetFundingFeesOutput =
  PerpPaginatedResponse<PerpFundingFees>

type GetFundingFees = (
  input?: Readonly<PerpIsolatedGetFundingFeesInput>
) => Promise<PerpIsolatedGetFundingFeesOutput>

export const createGetFundingFees = (
  instance: Readonly<KyInstance>
): GetFundingFees => {
  return async ({ instrument, pair, tradeId, ...page } = {}) => {
    return instance
      .get('perp/isolated/funding-fees', {
        searchParams: {
          instrument,
          pair,
          tradeId,
          ...toPerpPageSearchParams(page),
        },
      })
      .json()
  }
}
