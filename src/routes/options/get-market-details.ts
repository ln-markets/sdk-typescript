import type { RestFetcher } from '#src/rest.js'

import type { OptionsMarketDetails } from './types.js'

export const createGetMarketDetails = (request: RestFetcher) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/optionsgetoptionsmarket
   */
  return async () =>
    request({
      method: 'GET',
      path: '/options',
    }) as Promise<OptionsMarketDetails>
}
