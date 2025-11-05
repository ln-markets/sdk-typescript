import type { KyInstance } from 'ky'

import type { Deposit, DepositType } from './types.js'

export const createGetDeposits = (instance: KyInstance) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/usergetdeposits
   */
  return async (searchParams?: { type: DepositType }) =>
    instance.get('user/deposit', { searchParams }).json<Deposit[]>()
}
