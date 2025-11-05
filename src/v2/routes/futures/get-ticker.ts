import type { KyInstance } from 'ky'

import type { FuturesTicker } from './types.js'

export const createGetTicker = (instance: KyInstance) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/futuresgetticker
   */
  return async () => instance.get('futures/ticker').json<FuturesTicker>()
}
