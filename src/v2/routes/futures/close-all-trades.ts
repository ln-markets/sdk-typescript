import type { KyInstance } from 'ky'

import type { FuturesClosedTrade } from './types.js'

export const createCloseAllTrades = (instance: KyInstance) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/futuresclosealltrades
   */
  return async () =>
    instance.delete('futures/all/close').json<{
      trades: FuturesClosedTrade[]
    }>()
}
