import type { UUID } from '../../index.js'
import type { RestFetcher } from '../../rest.js'
import type { Swap, SwapSource } from './types.js'

export const createGetSwapBySourceId = (request: RestFetcher) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/swapsgetswapbysourceid
   */
  return async (params: { sourceId: UUID }, query: { source: SwapSource }) =>
    request<Swap>({
      method: 'GET',
      path: `/swap/source/${params.sourceId}`,
      query,
      requireAuth: true,
    })
}
