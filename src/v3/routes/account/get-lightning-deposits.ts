import type { KyInstance } from 'ky'
import type { PaginationInput } from '../../types.js'

export type GetLightningDepositsInput = PaginationInput & {
  settled?: boolean
}

export type GetLightningDepositsOutput = (
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
)[]

type GetLightningDeposits = (
  input?: GetLightningDepositsInput
) => Promise<GetLightningDepositsOutput>

export const createGetLightningDeposits = (
  instance: KyInstance
): GetLightningDeposits => {
  return async ({ from, limit, to, settled } = {}) => {
    return instance
      .get('account/deposits/lightning', {
        searchParams: { from, limit, to, settled },
      })
      .json()
  }
}
