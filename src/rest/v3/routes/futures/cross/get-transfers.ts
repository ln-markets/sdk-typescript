import type { KyInstance } from 'ky'

import type { PaginatedResponse, PaginationInput } from '../../../types.js'

export type FuturesCrossGetTransfersInput = PaginationInput

export interface Transfer {
  amount: number
  id: string
  time: string
  uid: string
}

export type FuturesCrossGetTransfersOutput = PaginatedResponse<Transfer>

type GetTransfers = (
  input?: Readonly<FuturesCrossGetTransfersInput>
) => Promise<FuturesCrossGetTransfersOutput>

export const createGetTransfers = (
  instance: Readonly<KyInstance>
): GetTransfers => {
  return async ({ cursor, from, limit, to } = {}) => {
    return instance
      .get('futures/cross/transfers', {
        searchParams: { cursor, from, limit, to },
      })
      .json()
  }
}
