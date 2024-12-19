import type { RestFetcher } from '../../rest.js'
import type { OHLC, OHLCRange } from './index.js'

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
    request<OHLC[]>({
      method: 'GET',
      path: '/futures/ohlcs',
      query,
    })
}
