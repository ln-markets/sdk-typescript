import type { UUID } from '../../index.js'
import type { RestFetcher } from '../../rest.js'
import type { Deposit } from './types.js'

export const createGetDeposit = (request: RestFetcher) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/usergetdeposit
   */
  return async (params: { depositId: UUID }) =>
    request<Deposit>({
      method: 'GET',
      path: `/user/deposit/${params.depositId}`,
      requireAuth: true,
    })
}
