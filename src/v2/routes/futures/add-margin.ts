import type { KyInstance } from 'ky'

import type { FuturesRunningTrade } from './types.js'

export const createAddMargin = (instance: KyInstance) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/futuresaddmargin
   */
  return async (body: { amount: number; id: string }) =>
    instance
      .post('futures/add-margin', {
        json: body,
      })
      .json<FuturesRunningTrade>()
}
