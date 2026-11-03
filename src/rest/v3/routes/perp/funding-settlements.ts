import type { KyInstance } from 'ky'

import { toPerpPageSearchParams } from './search-params.js'
import type {
  PerpMarketKey,
  PerpPaginatedResponse,
  PerpPaginationInput,
} from './types.js'

export type PerpGetFundingSettlementsInput = PerpMarketKey & PerpPaginationInput

export interface PerpFundingSettlement {
  fixingPrice: number
  fundingRate: number
  id: string
  quantoAdjustmentRate: number
  time: string
}

export type PerpGetFundingSettlementsOutput = PerpMarketKey &
  PerpPaginatedResponse<PerpFundingSettlement>

type GetFundingSettlements = (
  input: Readonly<PerpGetFundingSettlementsInput>
) => Promise<PerpGetFundingSettlementsOutput>

export const createGetFundingSettlements = (
  instance: Readonly<KyInstance>
): GetFundingSettlements => {
  return async ({ instrument, pair, ...page }) => {
    return instance
      .get('perp/funding-settlements', {
        searchParams: { instrument, pair, ...toPerpPageSearchParams(page) },
      })
      .json()
  }
}
