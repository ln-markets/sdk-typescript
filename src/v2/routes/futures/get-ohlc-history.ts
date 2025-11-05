import type { KyInstance } from 'ky'

import type { OHLC, OHLCRange } from './types.js'

export const createGetOHLCHistory = (instance: KyInstance) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/futuresgetohlcs
   */
  return async (searchParams: {
    from: number
    limit?: number
    range: OHLCRange
    to: number
  }) => instance.get('futures/ohlcs', { searchParams }).json<OHLC[]>()
}
