import type { UUID } from '../../index.js'
import type { RestFetcher } from '../../rest.js'
import type { FuturesTrade } from './index.js'

export const createGetTrade = (request: RestFetcher) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/futuresgettrade
   */
  return async (params: { id: UUID }) =>
    request({
      method: 'GET',
      path: `/futures/trades/${params.id}`,
    }) as Promise<FuturesTrade>
}
