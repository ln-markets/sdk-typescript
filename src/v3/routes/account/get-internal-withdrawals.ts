import type { KyInstance } from 'ky'
import type { PaginationInput } from '../../types.js'

export type GetInternalWithdrawalsInput = PaginationInput

export type GetInternalWithdrawalsOutput = {
  amount: number
  createdAt: Date
  id: string
  success: boolean | null
  toUsername: string
}[]

type GetInternalWithdrawals = (
  input?: GetInternalWithdrawalsInput
) => Promise<GetInternalWithdrawalsOutput>

export const createGetInternalWithdrawals = (
  instance: KyInstance
): GetInternalWithdrawals => {
  return async (input) => {
    return instance
      .get('account/withdrawals/internal', {
        searchParams: { ...input },
      })
      .json()
  }
}
