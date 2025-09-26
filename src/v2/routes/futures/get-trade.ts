import type { UUID } from '../../index.js'
import type { RestFetcher } from '../../rest.js'
import type { FuturesTrade } from './types.js'

export const createGetTrade = (request: RestFetcher) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/futuresgettrade
   */
  return async (params: { id: UUID }) =>
    request<FuturesTrade>({
      method: 'GET',
      path: `/futures/trades/${params.id}`,
    })
}
