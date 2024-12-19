import type { RestFetcher } from '../../rest.js'
import type { OptionsTrade, OptionsTradeStatus } from './index.js'

export const createGetTrades = (request: RestFetcher) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/optionsgettrades
   */
  return async (query?: {
    from: number
    limit?: number
    status: OptionsTradeStatus
    to: number
  }) =>
    request<OptionsTrade[]>({
      method: 'GET',
      path: '/options/trades',
      query,
      requireAuth: true,
    })
}
