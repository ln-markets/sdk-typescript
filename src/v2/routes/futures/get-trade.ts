import type { KyInstance } from 'ky'

import type { FuturesTrade } from './types.js'

export const createGetTrade = (instance: KyInstance) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/futuresgettrade
   */
  return async (params: { id: string }) =>
    instance.get(`futures/trades/${params.id}`).json<FuturesTrade>()
}
