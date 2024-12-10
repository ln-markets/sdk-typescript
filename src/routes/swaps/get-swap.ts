import type { RestFetcher } from '#src/rest.js'
import type { UUID } from '#src/types.js'

import type { Swap } from './types.js'

export const createGetSwap = (request: RestFetcher) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/swapsgetswap
   */
  return async (params: { swapId: UUID }) =>
    request({
      method: 'GET',
      path: `/swap/${params.swapId}`,
      requireAuth: true,
    }) as Promise<Swap>
}
