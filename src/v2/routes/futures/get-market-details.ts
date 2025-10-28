import type { KyInstance } from 'ky'

import type { FuturesMarketDetails } from './types.js'

export const createGetMarketDetails = (instance: KyInstance) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/futuresgetmarketdetails
   */
  return async () => instance.get('futures/market').json<FuturesMarketDetails>()
}
