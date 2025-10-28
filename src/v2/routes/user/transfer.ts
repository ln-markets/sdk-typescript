import type { KyInstance } from 'ky'

export const createTransfer = (instance: KyInstance) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/usertransfer
   */
  return async (body: { amount: number; toUsername: string }) =>
    instance
      .post('user/transfer', {
        json: body,
      })
      .json<{
        amount: number
        to: string
      }>()
}
