import type { RestFetcher } from '../../rest.js'
import type { Deposit, DepositType } from './types.js'

export const createGetDeposits = (request: RestFetcher) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/usergetdeposits
   */
  return async (query?: { type: DepositType }) =>
    request<Deposit[]>({
      method: 'GET',
      path: '/user/deposit',
      query,
      requireAuth: true,
    })
}
