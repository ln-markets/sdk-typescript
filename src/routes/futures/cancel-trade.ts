import type { RestFetcher } from '#src/rest.js'
import type { UUID } from '#src/types.js'

import type { FuturesCanceledTrade } from './types.js'

export const createCancelTrade = (request: RestFetcher) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/futurescanceltrade
   */
  return async (body: { id: UUID }) =>
    request({
      body,
      method: 'POST',
      path: `/futures/cancel`,
      requireAuth: true,
    }) as Promise<FuturesCanceledTrade>
}
