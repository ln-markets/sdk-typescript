import type { UUID } from '../../index.js'
import type { RestFetcher } from '../../rest.js'
import type { OptionsTrade } from './index.js'

export const createGetTrade = (request: RestFetcher) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/optionsgettrade
   */
  return async (params: { id: UUID }) =>
    request({
      method: 'GET',
      path: `/options/trades/${params.id}`,
      requireAuth: true,
    }) as Promise<OptionsTrade>
}
