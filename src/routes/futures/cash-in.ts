import type { RestFetcher } from '#src/rest.js'
import type { UUID } from '#src/types.js'

import type { FuturesRunningTrade } from './types.js'

export const createCashIn = (request: RestFetcher) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/futurescashin
   */
  return async (body: { amount: number; id: UUID }) =>
    request({
      body,
      method: 'POST',
      path: '/futures/cash-in',
      requireAuth: true,
    }) as Promise<FuturesRunningTrade>
}
