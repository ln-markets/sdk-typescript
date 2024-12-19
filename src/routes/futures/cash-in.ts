import type { UUID } from '../../index.js'
import type { RestFetcher } from '../../rest.js'
import type { FuturesRunningTrade } from './index.js'

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
