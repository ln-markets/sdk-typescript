import type { UUID } from '#src/index.js'
import type { RestFetcher } from '#src/rest.js'

import type { OptionsTradeClosed } from './types.js'

export const createCloseTrade = (request: RestFetcher) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/optionsclosetrade
   */
  return async (query: { id: UUID }) => {
    return request({
      method: 'DELETE',
      path: `/options`,
      query,
      requireAuth: true,
    }) as Promise<OptionsTradeClosed>
  }
}
