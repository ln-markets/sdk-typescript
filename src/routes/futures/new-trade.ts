import type { RestFetcher } from '../../rest.js'
import type {
  FuturesOpenOrRunningTrade,
  FuturesTradeSide,
  FuturesTradeType,
} from './index.js'

export const createNewTrade = (request: RestFetcher) => {
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
    request<FuturesOpenOrRunningTrade>({
      body,
      method: 'POST',
      path: '/futures',
      requireAuth: true,
    })
}
