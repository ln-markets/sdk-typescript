import type { UUID } from '../../index.js'
import type { RestFetcher } from '../../rest.js'
import type { FuturesOpenOrRunningTrade } from './index.js'

export const createUpdateTrade = (request: RestFetcher) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/futuresupdatetrade
   */
  return async (body: {
    id: UUID
    type: 'stoploss' | 'takeprofit'
    value: number
  }) =>
    request<FuturesOpenOrRunningTrade>({
      body,
      method: 'PUT',
      path: '/futures',
      requireAuth: true,
    })
}
