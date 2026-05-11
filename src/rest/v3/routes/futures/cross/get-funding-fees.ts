import type { KyInstance } from 'ky'
import type {
  FundingFees,
  PaginatedResponse,
  PaginationInput,
} from '../../../types.js'

export type FuturesCrossGetFundingFeesInput = PaginationInput

export type FuturesCrossGetFundingFeesOutput = PaginatedResponse<FundingFees>

type GetFundingFees = (
  input?: Readonly<FuturesCrossGetFundingFeesInput>
) => Promise<FuturesCrossGetFundingFeesOutput>

export const createGetFundingFees = (
  instance: Readonly<KyInstance>
): GetFundingFees => {
  return async ({ cursor, from, limit, to } = {}) => {
    return instance
      .get('futures/cross/funding-fees', {
        searchParams: {
          cursor,
          from,
          limit,
          to,
        },
      })
      .json()
  }
}
