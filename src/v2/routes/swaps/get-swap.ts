import type { KyInstance } from 'ky'

import type { Swap } from './types.js'

export const createGetSwap = (instance: KyInstance) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/swapsgetswap
   */
  return async (params: { swapId: string }) =>
    instance.get(`swap/${params.swapId}`).json<Swap>()
}
