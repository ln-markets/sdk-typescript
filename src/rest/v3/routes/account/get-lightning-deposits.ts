import type { KyInstance } from 'ky'
import type { PaginatedResponse, PaginationInput } from '../../types.js'

export type GetLightningDepositsInput = PaginationInput & {
  settled?: boolean
}

type LightningDeposit =
  | {
      id: string
      createdAt: string
      amount: number
      paymentHash: string
      settledAt: string
      comment: string | null
    }
  | {
      id: string
      createdAt: string
      amount: number
      paymentHash: string
      settledAt: null
      comment: string | null
    }

export type GetLightningDepositsOutput = PaginatedResponse<LightningDeposit>

type GetLightningDeposits = (
  input?: GetLightningDepositsInput
) => Promise<GetLightningDepositsOutput>

export const createGetLightningDeposits = (
  instance: KyInstance
): GetLightningDeposits => {
  return async ({ cursor, from, limit, to, settled } = {}) => {
    return instance
      .get('account/deposits/lightning', {
        searchParams: { cursor, from, limit, to, settled },
      })
      .json()
  }
}
