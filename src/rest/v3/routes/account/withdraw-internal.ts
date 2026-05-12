import type { KyInstance } from 'ky'

export interface WithdrawInternalInput {
  amount: number
  toUsername: string
}

export interface WithdrawInternalOutput {
  id: string
  createdAt: string
  fromUid: string
  toUid: string
  amount: number
}

type WithdrawInternal = (
  input: Readonly<WithdrawInternalInput>
) => Promise<WithdrawInternalOutput>

export const createWithdrawInternal = (
  instance: Readonly<KyInstance>
): WithdrawInternal => {
  return async ({ amount, toUsername }) => {
    return instance
      .post('account/withdraw/internal', { json: { amount, toUsername } })
      .json()
  }
}
