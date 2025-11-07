import type { KyInstance } from 'ky'
import type { PaginationInput } from '../../types.js'

export type GetInternalDepositsInput = PaginationInput

export type GetInternalDepositsOutput = {
  amount: number
  createdAt: string
  fromUsername: string
  id: string
  success: boolean | null
}[]

type GetInternalDeposits = (
  input?: GetInternalDepositsInput
) => Promise<GetInternalDepositsOutput>

export const createGetInternalDeposits = (
  instance: KyInstance
): GetInternalDeposits => {
  return async ({ from, limit, to } = {}) => {
    return instance
      .get('account/deposits/internal', { searchParams: { from, limit, to } })
      .json()
  }
}
