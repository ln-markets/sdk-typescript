import type { UUID } from '../../index.js'
import type { RestFetcher } from '../../rest.js'
import type { WithdrawalCondensed } from './index.js'

export const createGetWithdrawal = (request: RestFetcher) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/usergetwithdrawal
   */
  return async (params: { id: UUID }) =>
    request({
      method: 'GET',
      path: `/user/withdrawals/${params.id}`,
      requireAuth: true,
    }) as Promise<WithdrawalCondensed>
}
