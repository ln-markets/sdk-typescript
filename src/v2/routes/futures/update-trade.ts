import type { KyInstance } from 'ky'

import type { FuturesOpenOrRunningTrade } from './types.js'

export const createUpdateTrade = (instance: KyInstance) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/futuresupdatetrade
   */
  return async (body: {
    id: string
    type: 'stoploss' | 'takeprofit'
    value: number
  }) =>
    instance
      .put('futures', {
        json: body,
      })
      .json<FuturesOpenOrRunningTrade>()
}
