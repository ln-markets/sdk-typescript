import type { KyInstance } from 'ky'
import type { PaginationInput } from '../../types.js'

export type GetLightningDepositsInput = PaginationInput

export type GetLightningDepositsOutput = (
  | {
      id: string
      createdAt: Date
      amount: number
      paymentHash: string
      settledAt: Date
      comment: string | null
    }
  | {
      id: string
      createdAt: Date
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
  return async (input) => {
    return instance
      .get('account/deposits/lightning', { searchParams: { ...input } })
      .json()
  }
}
