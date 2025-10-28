import type { KyInstance } from 'ky'

import type { Swap, SwapAsset } from './types.js'

export const createNewSwap = (instance: KyInstance) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/swapsnewswap
   */
  return async (body: {
    inAmount: number
    inAsset: SwapAsset
    outAsset: SwapAsset
  }) =>
    instance
      .post('swap', {
        json: {
          in_amount: body.inAmount,
          in_asset: body.inAsset,
          out_asset: body.outAsset,
        },
      })
      .json<Swap>()
}
