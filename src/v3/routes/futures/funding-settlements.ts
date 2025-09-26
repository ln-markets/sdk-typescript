import type { KyInstance } from 'ky'
import type { PaginationInput } from '../../types.js'

export type GetFundingSettlementsInput = PaginationInput

export type GetFundingSettlementsOutput = {
  feeRate: number
  id: string
  price: number
  time: Date
}[]

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
