import type { RestFetcher } from '../../rest.js'
import type { FuturesTicker } from './types.js'

export const createGetTicker = (request: RestFetcher) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/futuresgetticker
   */
  return async () =>
    request<FuturesTicker>({
      method: 'GET',
      path: '/futures/ticker',
    })
}
