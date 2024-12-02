import type { RestFetcher } from '#src/rest.js'

import type { OHLC, OHLCRange } from './types.js'

export const createGetOHLCHistory = (request: RestFetcher) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/futuresgetohlcs
   */
  return async (query: {
    from: number
    limit?: number
    range: OHLCRange
    to: number
  }) =>
    request({
      method: 'GET',
      path: '/futures/ohlcs',
      query,
    }) as Promise<OHLC[]>
}
