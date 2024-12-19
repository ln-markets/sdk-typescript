import type { RestFetcher } from '../../rest.js'
import type { FuturesCanceledTrade } from './index.js'

export const createCancelAllTrades = (request: RestFetcher) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/futurescancelalltrades
   */
  return async () =>
    request<{
      trades: FuturesCanceledTrade[]
    }>({
      method: 'DELETE',
      path: '/futures/all/cancel',
      requireAuth: true,
    })
}
