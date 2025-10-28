import type { RestFetcher } from '../../rest.js'
import type { UUID } from '../../index.js'

export const createWithdraw = (request: RestFetcher) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/userwithdraw
   */
  return async (body: { invoice: string; quoteId?: UUID }) =>
    request<{
      amount?: number
      fee?: number
      id: UUID
      paymentHash?: string
      successTime?: number
    }>({
      body,
      method: 'POST',
      path: '/user/withdraw',
      requireAuth: true,
    })
}
