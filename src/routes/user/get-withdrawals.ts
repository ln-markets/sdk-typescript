import type { RestFetcher } from '../../rest.js'
import type { WithdrawalCondensed } from './index.js'

export const createGetWithdrawals = (request: RestFetcher) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/usergetwithdrawals
   */
  return async () =>
    request<WithdrawalCondensed[]>({
      method: 'GET',
      path: '/user/withdraw',
      requireAuth: true,
    })
}
