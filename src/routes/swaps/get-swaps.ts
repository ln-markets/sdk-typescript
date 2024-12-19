import type { RestFetcher } from '../../rest.js'
import type { Swap } from './index.js'

export const createGetSwaps = (request: RestFetcher) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/swapsgetswaps
   */
  return async (query?: { from?: number; limit?: number; to?: number }) =>
    request({
      method: 'GET',
      path: '/swap',
      query,
      requireAuth: true,
    }) as Promise<Swap[]>
}
