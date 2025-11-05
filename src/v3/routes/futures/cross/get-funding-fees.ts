import type { KyInstance } from 'ky'
import type { FundingFees, PaginationInput } from '../../../types.js'

export type FuturesCrossGetFundingFeesInput = PaginationInput

export type FuturesCrossGetFundingFeesOutput = FundingFees[]

type GetFundingFees = (
  input?: FuturesCrossGetFundingFeesInput
) => Promise<FuturesCrossGetFundingFeesOutput>

export const createGetFundingFees = (instance: KyInstance): GetFundingFees => {
  return async ({ from, limit, to } = {}) => {
    return instance
      .get('futures/cross/funding-fees', {
        searchParams: {
          from,
          limit,
          to,
        },
      })
      .json()
  }
}
