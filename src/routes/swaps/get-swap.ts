import type { UUID } from '#src/index.js'
import type { RestFetcher } from '#src/rest.js'

import type { Swap } from './types.js'

export const createGetSwap = (request: RestFetcher) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/swapsgetswap
   */
  return async (params: { swapId: UUID }) =>
    request({
      method: 'GET',
      path: `/swap/${params.swapId}`,
    }) as Promise<Swap>
}
