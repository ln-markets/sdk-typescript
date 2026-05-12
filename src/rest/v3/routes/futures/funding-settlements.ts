import type { KyInstance } from 'ky'

import type { PaginatedResponse, PaginationInput } from '../../types.js'

export type GetFundingSettlementsInput = PaginationInput

interface FundingSettlement {
  id: string
  time: string
  fundingRate: number
  fixingPrice: number
}

export type GetFundingSettlementsOutput = PaginatedResponse<FundingSettlement>

type GetFundingSettlements = (
  input?: Readonly<GetFundingSettlementsInput>
) => Promise<GetFundingSettlementsOutput>

export const createGetFuturesFundingSettlementsRoute = (
  instance: Readonly<KyInstance>
): GetFundingSettlements => {
  return async ({ cursor, from, limit, to } = {}) => {
    return instance
      .get('futures/funding-settlements', {
        searchParams: { cursor, from, limit, to },
      })
      .json()
  }
}
