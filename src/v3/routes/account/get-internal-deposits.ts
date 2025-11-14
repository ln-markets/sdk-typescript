import type { KyInstance } from 'ky'
import type { PaginatedResponse, PaginationInput } from '../../types.js'

export type GetInternalDepositsInput = PaginationInput

interface InternalDeposit {
  amount: number
  createdAt: string
  fromUsername: string
  id: string
  success: boolean | null
}

export type GetInternalDepositsOutput = PaginatedResponse<InternalDeposit>

type GetInternalDeposits = (
  input?: GetInternalDepositsInput
) => Promise<GetInternalDepositsOutput>

export const createGetInternalDeposits = (
  instance: KyInstance
): GetInternalDeposits => {
  return async ({ cursor, from, limit, to } = {}) => {
    return instance
      .get('account/deposits/internal', {
        searchParams: { cursor, from, limit, to },
      })
      .json()
  }
}
