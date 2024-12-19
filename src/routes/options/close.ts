import type { UUID } from '../../index.js'
import type { RestFetcher } from '../../rest.js'
import type { OptionsTradeClosed } from './index.js'

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
