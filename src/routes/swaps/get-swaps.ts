import type { RestFetcher } from '#src/rest.js'

import type { Swap } from './types.js'

export const createGetSwaps = (request: RestFetcher) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/swapsgetswaps
   */
  return async (query?: { from?: number; limit?: number; to?: number }) =>
    request({
      method: 'GET',
      path: '/swap',
      query,
    }) as Promise<Swap[]>
}
