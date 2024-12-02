import type { RestFetcher } from '#src/rest.js'
import type { UUID } from '#src/types.js'

import type { FuturesTrade } from './types.js'

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
