import type { KyInstance } from 'ky'

export const createDeposit = (instance: KyInstance) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/userdeposit
   */
  return async (body: { amount: number }) =>
    instance
      .post('user/deposit', {
        json: body,
      })
      .json<{
        depositId: string
        expiry: number
        paymentRequest: string
      }>()
}
