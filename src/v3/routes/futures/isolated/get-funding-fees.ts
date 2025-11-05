import type { KyInstance } from 'ky'
import type { FundingFees } from '../../../types.js'

export interface FuturesIsolatedGetFundingFeesInput {
  from?: string
  limit?: number
  to?: string
  tradeId?: string
}

export type FuturesIsolatedGetFundingFeesOutput = FundingFees[]

type GetFundingFees = (
  input?: FuturesIsolatedGetFundingFeesInput
) => Promise<FuturesIsolatedGetFundingFeesOutput>

export const createGetFundingFees = (instance: KyInstance): GetFundingFees => {
  return async ({ from, limit, to, tradeId } = {}) => {
    return instance
      .get('futures/isolated/funding-fees', {
        searchParams: {
          from,
          limit,
          to,
          tradeId,
        },
      })
      .json()
  }
}
