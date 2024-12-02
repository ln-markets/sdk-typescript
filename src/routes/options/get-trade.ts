import type { UUID } from '#src/index.js'
import type { RestFetcher } from '#src/rest.js'

import type { OptionsTrade } from './types.js'

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
