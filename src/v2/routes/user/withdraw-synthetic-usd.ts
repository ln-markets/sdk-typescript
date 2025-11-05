import type { KyInstance } from 'ky'

import type { Currency } from './types.js'

export const createWithdrawSyntheticUsd = (instance: KyInstance) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/userwithdrawalsyntheticusd
   */
  return async (body: { amount: number; currency: Currency }) =>
    instance
      .post('user/withdraw/susd', {
        json: body,
      })
      .json<{
        amount: number
        currency: Currency
        feeReserve: number
        minBalanceAfter: number
        quoteId: string
        validUntil: number
      }>()
}
