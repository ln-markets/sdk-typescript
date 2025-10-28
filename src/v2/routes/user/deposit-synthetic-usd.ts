import type { UUID } from '../../index.js'
import type { RestFetcher } from '../../rest.js'
import type { Currency } from './types.js'

export const createDepositSyntheticUsd = (request: RestFetcher) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/userdepositsyntheticusd
   */
  return async (body: { amount: number; currency: Currency }) =>
    request<{
      depositId: UUID
      expiry: number
      paymentRequest: string
      syntheticUsdAmount: number
    }>({
      body,
      method: 'POST',
      path: '/user/deposit/susd',
      requireAuth: true,
    })
}
