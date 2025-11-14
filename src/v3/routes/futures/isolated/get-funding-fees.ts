import type { KyInstance } from 'ky'
import type {
  FundingFees,
  PaginatedResponse,
  PaginationInput,
} from '../../../types.js'

export interface FuturesIsolatedGetFundingFeesInput extends PaginationInput {
  tradeId?: string
}

export type FuturesIsolatedGetFundingFeesOutput = PaginatedResponse<FundingFees>

type GetFundingFees = (
  input?: FuturesIsolatedGetFundingFeesInput
) => Promise<FuturesIsolatedGetFundingFeesOutput>

export const createGetFundingFees = (instance: KyInstance): GetFundingFees => {
  return async ({ cursor, from, limit, to, tradeId } = {}) => {
    return instance
      .get('futures/isolated/funding-fees', {
        searchParams: {
          cursor,
          from,
          limit,
          to,
          tradeId,
        },
      })
      .json()
  }
}
