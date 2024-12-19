import type { RestFetcher } from '../../rest.js'
import type { FuturesMarketDetails } from './types.js'

export const createGetMarketDetails = (request: RestFetcher) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/futuresgetmarketdetails
   */
  return async () =>
    request<FuturesMarketDetails>({
      method: 'GET',
      path: '/futures/market',
    })
}
