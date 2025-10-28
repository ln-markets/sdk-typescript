import type { KyInstance } from 'ky'

import type { FuturesTrade, FuturesTradeStatus } from './types.js'

export const createGetTrades = (instance: KyInstance) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/futuresgettrades
   */
  return async (searchParams: {
    from?: number
    limit?: number
    to?: number
    type: FuturesTradeStatus
  }) => instance.get('futures', { searchParams }).json<FuturesTrade[]>()
}
