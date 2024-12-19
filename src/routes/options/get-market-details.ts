import type { RestFetcher } from '../../rest.js'
import type { OptionsMarketDetails } from './index.js'

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
