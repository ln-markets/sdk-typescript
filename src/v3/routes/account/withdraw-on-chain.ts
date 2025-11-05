import type { KyInstance } from 'ky'

export interface WithdrawOnChainInput {
  address: string
  amount: number
}

export interface WithdrawOnChainOutput {
  address: string
  amount: number
  createdAt: Date
  fee: null | number
  id: string
  status: 'pending'
  txId: null
  uid: string
  updatedAt: Date
}

type WithdrawOnChain = (
  input: WithdrawOnChainInput
) => Promise<WithdrawOnChainOutput>

export const createWithdrawOnChain = (
  instance: KyInstance
): WithdrawOnChain => {
  return async ({ address, amount }) => {
    return instance
      .post('account/withdraw/on-chain', { json: { address, amount } })
      .json()
  }
}
