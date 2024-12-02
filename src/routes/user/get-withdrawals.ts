import type { RestFetcher } from '#src/rest.js'

import type { WithdrawalCondensed } from './types.js'

export const createGetWithdrawals = (request: RestFetcher) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/usergetwithdrawals
   */
  return async () =>
    request({
      method: 'GET',
      path: '/user/withdraw',
      requireAuth: true,
    }) as Promise<WithdrawalCondensed[]>
}
