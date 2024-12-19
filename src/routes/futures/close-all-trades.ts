import type { RestFetcher } from '#src/rest.js'

import type { FuturesClosedTrade } from './index.js'

export const createCloseAllTrades = (request: RestFetcher) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/futuresclosealltrades
   */
  return async () =>
    request({
      method: 'DELETE',
      path: '/futures/all/close',
      requireAuth: true,
    }) as Promise<{
      trades: FuturesClosedTrade[]
    }>
}
