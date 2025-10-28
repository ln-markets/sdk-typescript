import type { KyInstance } from 'ky'

export interface WithdrawInternalInput {
  amount: number
  toUsername: string
}

export interface WithdrawInternalOutput {
  amount: number
  createdAt: Date
  fromUid: string
  fromUsername: string
  id: string
  settledAt: Date | null
  success: boolean | null
  toUid: string
  toUsername: string
}

type WithdrawInternal = (
  input: WithdrawInternalInput
) => Promise<WithdrawInternalOutput>

export const createWithdrawInternal = (
  instance: KyInstance
): WithdrawInternal => {
  return async ({ amount, toUsername }) => {
    return instance
      .post('account/withdraw/internal', { json: { amount, toUsername } })
      .json()
  }
}
