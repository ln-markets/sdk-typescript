import type { KyInstance } from 'ky'

import type { PaginatedResponse, PaginationInput } from '../../types.js'

export type GetLightningWithdrawalsInput = PaginationInput & {
  status?: 'failed' | 'processed' | 'processing'
}

export interface LightningWithdrawal {
  amount: number
  createdAt: string
  destination: null | string
  fee: number
  id: string
  paymentHash: string
  status: 'failed' | 'processed' | 'processing'
}

export type GetLightningWithdrawalsOutput =
  PaginatedResponse<LightningWithdrawal>

type GetLightningWithdrawals = (
  input?: Readonly<GetLightningWithdrawalsInput>
) => Promise<GetLightningWithdrawalsOutput>

export const createGetLightningWithdrawals = (
  instance: Readonly<KyInstance>
): GetLightningWithdrawals => {
  return async ({ cursor, from, limit, to, status } = {}) => {
    return instance
      .get('account/withdrawals/lightning', {
        searchParams: { cursor, from, limit, to, status },
      })
      .json()
  }
}
