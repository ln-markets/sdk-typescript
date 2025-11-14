import type { KyInstance } from 'ky'
import type { PaginatedResponse, PaginationInput } from '../../types.js'

export type GetInternalWithdrawalsInput = PaginationInput

interface InternalWithdrawal {
  amount: number
  createdAt: string
  id: string
  success: boolean | null
  toUsername: string
}

export type GetInternalWithdrawalsOutput = PaginatedResponse<InternalWithdrawal>

type GetInternalWithdrawals = (
  input?: GetInternalWithdrawalsInput
) => Promise<GetInternalWithdrawalsOutput>

export const createGetInternalWithdrawals = (
  instance: KyInstance
): GetInternalWithdrawals => {
  return async ({ cursor, from, limit, to } = {}) => {
    return instance
      .get('account/withdrawals/internal', {
        searchParams: { cursor, from, limit, to },
      })
      .json()
  }
}
