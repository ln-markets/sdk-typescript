import type { KyInstance } from 'ky'

import type { FuturesCanceledTrade } from './types.js'

export const createCancelAllTrades = (instance: KyInstance) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/futurescancelalltrades
   */
  return async () =>
    instance.delete('futures/all/cancel').json<{
      trades: FuturesCanceledTrade[]
    }>()
}
