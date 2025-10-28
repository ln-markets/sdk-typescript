import type { KyInstance } from 'ky'

import type {
  FuturesOpenOrRunningTrade,
  FuturesTradeSide,
  FuturesTradeType,
} from './types.js'

export const createNewTrade = (instance: KyInstance) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/futuresnewtrade
   */
  return async (body: {
    leverage: number
    margin?: number
    price?: number
    quantity?: number
    side: FuturesTradeSide
    stoploss?: number
    takeprofit?: number
    type: FuturesTradeType
  }) =>
    instance
      .post('futures', {
        json: body,
      })
      .json<FuturesOpenOrRunningTrade>()
}
