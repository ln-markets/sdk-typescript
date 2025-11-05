import type { KyInstance } from 'ky'

import type { Swap, SwapSource } from './types.js'

export const createGetSwapBySourceId = (instance: KyInstance) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/swapsgetswapbysourceid
   */
  return async (
    params: { sourceId: string },
    searchParams: { source: SwapSource }
  ) =>
    instance
      .get(`swap/source/${params.sourceId}`, { searchParams })
      .json<Swap>()
}
