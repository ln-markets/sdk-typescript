import type { UUID } from '#src/index.js'
import type { RestFetcher } from '#src/rest.js'

import type { FuturesOpenOrRunningTrade } from './types.js'

export const createUpdateTrade = (request: RestFetcher) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/futuresupdatetrade
   */
  return async (body: {
    id: UUID
    type: 'stoploss' | 'takeprofit'
    value: number
  }) =>
    request({
      body,
      method: 'PUT',
      path: '/futures',
      requireAuth: true,
    }) as Promise<FuturesOpenOrRunningTrade>
}
