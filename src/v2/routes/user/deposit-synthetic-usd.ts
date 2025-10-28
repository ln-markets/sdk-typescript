import type { KyInstance } from 'ky'

import type { Currency } from './types.js'

export const createDepositSyntheticUsd = (instance: KyInstance) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/userdepositsyntheticusd
   */
  return async (body: { amount: number; currency: Currency }) =>
    instance
      .post('user/deposit/susd', {
        json: body,
      })
      .json<{
        depositId: string
        expiry: number
        paymentRequest: string
        syntheticUsdAmount: number
      }>()
}
