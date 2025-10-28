import type { KyInstance } from 'ky'

import type { Deposit } from './types.js'

export const createGetDeposit = (instance: KyInstance) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/usergetdeposit
   */
  return async (params: { depositId: string }) =>
    instance.get(`user/deposit/${params.depositId}`).json<Deposit>()
}
