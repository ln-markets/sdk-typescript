import type { KyInstance } from 'ky'
import type { PaginationInput } from '../../types.js'

export type GetOnChainWithdrawalsInput = PaginationInput

export type GetOnChainWithdrawalsOutput = {
  address: string
  amount: number
  createdAt: Date
  fee: null | number
  id: string
  status: 'canceled' | 'pending' | 'processed' | 'processing' | 'rejected'
  txId: null | string
}[]

type GetOnChainWithdrawals = (
  input?: GetOnChainWithdrawalsInput
) => Promise<GetOnChainWithdrawalsOutput>

export const createGetOnChainWithdrawals = (
  instance: KyInstance
): GetOnChainWithdrawals => {
  return async ({ from, limit, to } = {}) => {
    return instance
      .get('account/withdrawals/on-chain', {
        searchParams: { from, limit, to },
      })
      .json()
  }
}
