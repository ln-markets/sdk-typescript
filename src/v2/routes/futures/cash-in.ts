import type { KyInstance } from 'ky'

import type { FuturesRunningTrade } from './types.js'

export const createCashIn = (instance: KyInstance) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/futurescashin
   */
  return async (body: { amount: number; id: string }) =>
    instance
      .post('futures/cash-in', {
        json: body,
      })
      .json<FuturesRunningTrade>()
}
