import type { UUID } from '../../index.js'
import type { RestFetcher } from '../../rest.js'

export const createWithdraw = (request: RestFetcher) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/userwithdraw
   */
  return async (body: { invoice: string; quoteId?: UUID }) =>
    request({
      body,
      method: 'POST',
      path: '/user/withdraw',
      requireAuth: true,
    }) as Promise<{
      amount?: number
      fee?: number
      id: UUID
      paymentHash?: string
      successTime?: number
    }>
}
