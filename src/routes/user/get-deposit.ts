import type { UUID } from '#src/index.js'
import type { RestFetcher } from '#src/rest.js'

import type { Deposit } from './types.js'

export const createGetDeposit = (request: RestFetcher) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/usergetdeposit
   */
  return async (params: { depositId: UUID }) =>
    request({
      method: 'GET',
      path: `/user/deposit/${params.depositId}`,
      requireAuth: true,
    }) as Promise<Deposit>
}
