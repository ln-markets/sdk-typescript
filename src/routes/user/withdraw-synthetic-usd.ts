import type { UUID } from '../../index.js'
import type { RestFetcher } from '../../rest.js'
import type { Currency } from './index.js'

export const createWithdrawSyntheticUsd = (request: RestFetcher) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/userwithdrawalsyntheticusd
   */
  return async (body: { amount: number; currency: Currency }) =>
    request<{
      amount: number
      currency: Currency
      feeReserve: number
      minBalanceAfter: number
      quoteId: UUID
      validUntil: number
    }>({
      body,
      method: 'POST',
      path: '/user/withdraw/susd',
      requireAuth: true,
    })
}
