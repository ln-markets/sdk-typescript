import type { RestFetcher } from '#src/rest.js'

import type { FuturesMarketDetails } from './index.js'

export const createGetMarketDetails = (request: RestFetcher) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/futuresgetmarketdetails
   */
  return async () =>
    request({
      method: 'GET',
      path: '/futures/market',
    }) as Promise<FuturesMarketDetails>
}
