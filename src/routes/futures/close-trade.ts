import type { UUID } from '#src/index.js'
import type { RestFetcher } from '#src/rest.js'

import type { FuturesClosedTrade } from './types.js'

export const createCloseTrade = (request: RestFetcher) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/futuresclosetrade
   */
  return async (query: { id: UUID }) =>
    request({
      method: 'DELETE',
      path: '/futures',
      query,
      requireAuth: true,
    }) as Promise<FuturesClosedTrade>
}
