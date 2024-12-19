import type { UUID } from '../../index.js'
import type { RestFetcher } from '../../rest.js'
import type { FuturesRunningTrade } from './types.js'

export const createAddMargin = (request: RestFetcher) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/futuresaddmargin
   */
  return async (body: { amount: number; id: UUID }) =>
    request<FuturesRunningTrade>({
      body,
      method: 'POST',
      path: '/futures/add-margin',
      requireAuth: true,
    })
}
