import type { RestFetcher } from '#src/rest.js'

import type { FuturesMarketDetails } from './types.js'

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
