import type { KyInstance } from 'ky'
import type { PaginatedResponse, PaginationInput } from '../../types.js'

export type GetOnChainWithdrawalsInput = PaginationInput & {
  status?: 'canceled' | 'pending' | 'processed' | 'processing' | 'rejected'
}

interface OnChainWithdrawal {
  address: string
  amount: number
  createdAt: string
  fee: null | number
  id: string
  status: 'canceled' | 'pending' | 'processed' | 'processing' | 'rejected'
  txId: null | string
}

export type GetOnChainWithdrawalsOutput = PaginatedResponse<OnChainWithdrawal>

type GetOnChainWithdrawals = (
  input?: GetOnChainWithdrawalsInput
) => Promise<GetOnChainWithdrawalsOutput>

export const createGetOnChainWithdrawals = (
  instance: KyInstance
): GetOnChainWithdrawals => {
  return async ({ cursor, from, limit, to, status } = {}) => {
    return instance
      .get('account/withdrawals/on-chain', {
        searchParams: { cursor, from, limit, to, status },
      })
      .json()
  }
}
