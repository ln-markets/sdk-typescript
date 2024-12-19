import type { UUID } from '../../index.js'
import type { RestFetcher } from '../../rest.js'
import type { Deposit } from './index.js'

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
