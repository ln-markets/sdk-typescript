import type { RestFetcher } from '#src/rest.js'

import type { Deposit, DepositType } from './index.js'

export const createGetDeposits = (request: RestFetcher) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/usergetdeposits
   */
  return async (query?: { type: DepositType }) =>
    request({
      method: 'GET',
      path: '/user/deposit',
      query,
      requireAuth: true,
    }) as Promise<Deposit[]>
}
