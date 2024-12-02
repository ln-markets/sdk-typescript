import type { RestFetcher } from '#src/rest.js'

import type { OptionsVolatilityIndex } from './types.js'

export const createGetVolatilityIndex = (request: RestFetcher) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/optionsgetvolatilityindex
   */
  return async () =>
    request({
      method: 'GET',
      path: '/options/volatility-index',
    }) as Promise<OptionsVolatilityIndex>
}
