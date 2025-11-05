import type { KyInstance } from 'ky'
import type { PaginationInput } from '../../types.js'

type BitcoinDeposit =
  | {
      amount: number
      blockHeight: null
      confirmations: 0
      createdAt: Date
      id: string
      status: 'MEMPOOL'
      txId: string
    }
  | {
      amount: number
      blockHeight: number
      confirmations: number
      createdAt: Date
      id: string
      status: 'CONFIRMED'
      txId: string
    }
  | {
      amount: number
      blockHeight: number
      confirmations: number
      createdAt: Date
      id: string
      status: 'IRREVERSIBLE'
      txId: string
    }

export type GetOnChainDepositsInput = PaginationInput

export type GetOnChainDepositsOutput = BitcoinDeposit[]

type GetOnChainDeposits = (
  input?: GetOnChainDepositsInput
) => Promise<GetOnChainDepositsOutput>

export const createGetOnChainDeposits = (
  instance: KyInstance
): GetOnChainDeposits => {
  return async (input) => {
    return instance
      .get('account/deposits/on-chain', { searchParams: { ...input } })
      .json()
  }
}
