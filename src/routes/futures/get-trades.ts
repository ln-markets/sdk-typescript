import type { RestFetcher } from '../../rest.js'
import type { FuturesTrade, FuturesTradeStatus } from './index.js'

export const createGetTrades = (request: RestFetcher) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/futuresgettrades
   */
  return async (query: {
    from?: number
    limit?: number
    to?: number
    type: FuturesTradeStatus
  }) =>
    request({
      method: 'GET',
      path: '/futures',
      query,
      requireAuth: true,
    }) as Promise<FuturesTrade[]>
}
