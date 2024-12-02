import type { RestFetcher } from '#src/rest.js'

import type { FuturesTicker } from './types.js'

export const createGetTicker = (request: RestFetcher) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/futuresgetticker
   */
  return async () =>
    request({
      method: 'GET',
      path: '/futures/ticker',
    }) as Promise<FuturesTicker>
}
