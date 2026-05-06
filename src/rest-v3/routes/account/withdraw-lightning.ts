import type { KyInstance } from 'ky'

export interface WithdrawLightningInput {
  invoice: string
}

export interface WithdrawLightningOutput {
  amount: number
  id: string
  maxFees: number
  paymentHash: string
}

type WithdrawLightning = (
  input: WithdrawLightningInput
) => Promise<WithdrawLightningOutput>

export const createWithdrawLightning = (
  instance: KyInstance
): WithdrawLightning => {
  return async ({ invoice }) => {
    return instance
      .post('account/withdraw/lightning', { json: { invoice } })
      .json()
  }
}
