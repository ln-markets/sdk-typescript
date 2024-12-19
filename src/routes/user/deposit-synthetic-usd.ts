import type { UUID } from '#src/index.js'
import type { RestFetcher } from '#src/rest.js'

import type { Currency } from './index.js'

export const createDepositSyntheticUsd = (request: RestFetcher) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/userdepositsyntheticusd
   */
  return async (body: { amount: number; currency: Currency }) =>
    request({
      body,
      method: 'POST',
      path: '/user/deposit/susd',
      requireAuth: true,
    }) as Promise<{
      depositId: UUID
      expiry: number
      paymentRequest: string
      syntheticUsdAmount: number
    }>
}
