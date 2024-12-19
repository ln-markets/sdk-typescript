import type { UUID } from '../../index.js'
import type { RestFetcher } from '../../rest.js'
import type { FuturesClosedTrade } from './index.js'

export const createCloseTrade = (request: RestFetcher) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/futuresclosetrade
   */
  return async (query: { id: UUID }) =>
    request<FuturesClosedTrade>({
      method: 'DELETE',
      path: '/futures',
      query,
      requireAuth: true,
    })
}
