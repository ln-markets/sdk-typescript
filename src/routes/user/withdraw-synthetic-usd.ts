import type { UUID } from '#src/index.js'
import type { RestFetcher } from '#src/rest.js'

import type { Currency } from './types.js'

export const createWithdrawSyntheticUsd = (request: RestFetcher) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/userwithdrawalsyntheticusd
   */
  return async (body: { amount: number; currency: Currency }) =>
    request({
      body,
      method: 'POST',
      path: '/user/withdraw/susd',
      requireAuth: true,
    }) as Promise<{
      amount: number
      currency: Currency
      feeReserve: number
      minBalanceAfter: number
      quoteId: UUID
      validUntil: number
    }>
}
