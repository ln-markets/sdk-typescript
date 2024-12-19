import type { UUID } from '../../index.js'
import type { RestFetcher } from '../../rest.js'

export const createDeposit = (request: RestFetcher) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/userdeposit
   */
  return async (body: { amount: number }) =>
    request({
      body,
      method: 'POST',
      path: '/user/deposit',
      requireAuth: true,
    }) as Promise<{
      depositId: UUID
      expiry: number
      paymentRequest: string
    }>
}
