import type { KyInstance } from 'ky'

import type { FuturesClosedTrade } from './types.js'

export const createCloseTrade = (instance: KyInstance) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/futuresclosetrade
   */
  return async (searchParams: { id: string }) =>
    instance.delete('futures', { searchParams }).json<FuturesClosedTrade>()
}
