import type { KyInstance } from 'ky'
import type { PaginationInput } from '../../types.js'

export type GetFundingSettlementsInput = PaginationInput

export interface GetFundingSettlementsOutput {
  data: {
    id: string
    time: Date
    fundingRate: number
    fixingPrice: number
  }[]
  count: number
}

type GetFundingSettlements = (
  input: GetFundingSettlementsInput
) => Promise<GetFundingSettlementsOutput>

export const createGetFuturesFundingSettlementsRoute = (
  instance: KyInstance
): GetFundingSettlements => {
  return async ({ from, limit, to }) => {
    return instance
      .get('/futures/funding-settlements', {
        searchParams: { from, limit, to },
      })
      .json()
  }
}
