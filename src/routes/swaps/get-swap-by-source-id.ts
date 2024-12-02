import type { RestFetcher } from '#src/rest.js'
import type { UUID } from '#src/types.js'

import type { Swap, SwapSource } from './types.js'

export const createGetSwapBySourceId = (request: RestFetcher) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/swapsgetswapbysourceid
   */
  return async (params: { sourceId: UUID }, query: { source: SwapSource }) =>
    request({
      method: 'GET',
      path: `/swap/source/${params.sourceId}`,
      query,
    }) as Promise<Swap>
}
