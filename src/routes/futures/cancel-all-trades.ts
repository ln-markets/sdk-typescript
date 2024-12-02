import type { RestFetcher } from '#src/rest.js'

import type { FuturesCanceledTrade } from './types.js'

export const createCancelAllTrades = (request: RestFetcher) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/futurescancelalltrades
   */
  return async () =>
    request({
      method: 'DELETE',
      path: '/futures/all/cancel',
      requireAuth: true,
    }) as Promise<{
      trades: FuturesCanceledTrade[]
    }>
}
