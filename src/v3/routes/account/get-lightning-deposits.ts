import type { KyInstance } from 'ky'
import type { PaginationInput } from '../../types.js'

export type GetLightningDepositsInput = PaginationInput

export type GetLightningDepositsOutput = (
  | {
      amount: null | number
      comment: null | string
      createdAt: Date
      id: string
      paymentHash: null | string
      success: false
    }
  | {
      amount: number
      comment: null | string
      createdAt: Date
      id: string
      paymentHash: string
      success: true
    }
)[]

type GetLightningDeposits = (
  input: GetLightningDepositsInput
) => Promise<GetLightningDepositsOutput>

export const createGetLightningDeposits = (
  instance: KyInstance
): GetLightningDeposits => {
  return async ({ from, limit, to }) => {
    return instance
      .get('account/deposits/lightning', { searchParams: { from, limit, to } })
      .json()
  }
}
