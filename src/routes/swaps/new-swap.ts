import type { RestFetcher } from '../../rest.js'
import type { Swap, SwapAsset } from './types.js'

export const createNewSwap = (request: RestFetcher) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/swapsnewswap
   */
  return async (body: {
    inAmount: number
    inAsset: SwapAsset
    outAsset: SwapAsset
  }) =>
    request<Swap>({
      body: {
        in_amount: body.inAmount,
        in_asset: body.inAsset,
        out_asset: body.outAsset,
      },
      method: 'POST',
      path: '/swap',
      requireAuth: true,
    })
}
