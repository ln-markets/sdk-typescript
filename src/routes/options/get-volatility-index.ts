import type { RestFetcher } from '../../rest.js'
import type { OptionsVolatilityIndex } from './index.js'

export const createGetVolatilityIndex = (request: RestFetcher) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/optionsgetvolatilityindex
   */
  return async () =>
    request<OptionsVolatilityIndex>({
      method: 'GET',
      path: '/options/volatility-index',
    })
}
