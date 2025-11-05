import type { KyInstance } from 'ky'

import type { WithdrawalCondensed } from './types.js'

export const createGetWithdrawals = (instance: KyInstance) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/usergetwithdrawals
   */
  return async () => instance.get('user/withdraw').json<WithdrawalCondensed[]>()
}
