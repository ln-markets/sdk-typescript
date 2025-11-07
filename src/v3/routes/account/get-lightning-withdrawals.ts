import type { KyInstance } from 'ky'
import type { PaginationInput } from '../../types.js'

export type GetLightningWithdrawalsInput = PaginationInput & {
  status?: 'failed' | 'processed' | 'processing'
}

export type GetLightningWithdrawalsOutput = {
  amount: number
  createdAt: string
  destination: null | string
  fee: number
  id: string
  paymentHash: string
  status: 'failed' | 'processed' | 'processing'
}[]

type GetLightningWithdrawals = (
  input?: GetLightningWithdrawalsInput
) => Promise<GetLightningWithdrawalsOutput>

export const createGetLightningWithdrawals = (
  instance: KyInstance
): GetLightningWithdrawals => {
  return async ({ from, limit, to, status } = {}) => {
    return instance
      .get('account/withdrawals/lightning', {
        searchParams: { from, limit, to, status },
      })
      .json()
  }
}
