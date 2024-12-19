import type { RestFetcher } from '../../rest.js'
import type { FuturesClosedTrade } from './types.js'

export const createCloseAllTrades = (request: RestFetcher) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/futuresclosealltrades
   */
  return async () =>
    request<{
      trades: FuturesClosedTrade[]
    }>({
      method: 'DELETE',
      path: '/futures/all/close',
      requireAuth: true,
    })
}
