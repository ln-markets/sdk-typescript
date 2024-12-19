import type { UUID } from '../../index.js'
import type { RestFetcher } from '../../rest.js'
import type { OptionsTradeClosed } from './types.js'

export const createCloseTrade = (request: RestFetcher) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/optionsclosetrade
   */
  return async (query: { id: UUID }) => {
    return request<OptionsTradeClosed>({
      method: 'DELETE',
      path: `/options`,
      query,
      requireAuth: true,
    })
  }
}
