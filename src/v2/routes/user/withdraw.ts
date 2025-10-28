import type { KyInstance } from 'ky'

export const createWithdraw = (instance: KyInstance) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/userwithdraw
   */
  return async (body: { invoice: string; quoteId?: string }) =>
    instance
      .post('user/withdraw', {
        json: body,
      })
      .json<{
        amount?: number
        fee?: number
        id: string
        paymentHash?: string
        successTime?: number
      }>()
}
