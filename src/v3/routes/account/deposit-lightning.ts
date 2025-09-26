import type { KyInstance } from 'ky'

export interface DepositLightningInput {
  amount: number
  comment?: string
  descriptionHash?: string
}

export interface DepositLightningOutput {
  depositId: string
  paymentRequest: string
}

type DepositLightning = (
  input: DepositLightningInput
) => Promise<DepositLightningOutput>

export const createDepositLightning = (
  instance: KyInstance
): DepositLightning => {
  return async ({ amount, comment, descriptionHash }) => {
    return instance
      .post('account/deposit/lightning', {
        json: { amount, comment, descriptionHash },
      })
      .json()
  }
}
