import type { KyInstance } from 'ky'

import type { WithdrawalCondensed } from './types.js'

export const createGetWithdrawal = (instance: KyInstance) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/usergetwithdrawal
   */
  return async (params: { id: string }) =>
    instance.get(`user/withdrawals/${params.id}`).json<WithdrawalCondensed>()
}
