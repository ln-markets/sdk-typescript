import type { UUID } from '#src/index.js'
import type { RestFetcher } from '#src/rest.js'

import type { FuturesRunningTrade } from './index.js'

export const createAddMargin = (request: RestFetcher) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/futuresaddmargin
   */
  return async (body: { amount: number; id: UUID }) =>
    request({
      body,
      method: 'POST',
      path: '/futures/add-margin',
      requireAuth: true,
    }) as Promise<FuturesRunningTrade>
}
