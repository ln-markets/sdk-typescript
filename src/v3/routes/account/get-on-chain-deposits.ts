import type { KyInstance } from 'ky'
import type { PaginatedResponse, PaginationInput } from '../../types.js'

type BitcoinDeposit =
  | {
      amount: number
      blockHeight: null
      confirmations: 0
      createdAt: string
      id: string
      status: 'MEMPOOL'
      txId: string
    }
  | {
      amount: number
      blockHeight: number
      confirmations: number
      createdAt: string
      id: string
      status: 'CONFIRMED'
      txId: string
    }
  | {
      amount: number
      blockHeight: number
      confirmations: number
      createdAt: string
      id: string
      status: 'IRREVERSIBLE'
      txId: string
    }

export type GetOnChainDepositsInput = PaginationInput & {
  status?: 'MEMPOOL' | 'CONFIRMED' | 'IRREVERSIBLE'
}

export type GetOnChainDepositsOutput = PaginatedResponse<BitcoinDeposit>

type GetOnChainDeposits = (
  input?: GetOnChainDepositsInput
) => Promise<GetOnChainDepositsOutput>

export const createGetOnChainDeposits = (
  instance: KyInstance
): GetOnChainDeposits => {
  return async ({ cursor, from, limit, to, status } = {}) => {
    return instance
      .get('account/deposits/on-chain', {
        searchParams: { cursor, from, limit, to, status },
      })
      .json()
  }
}
