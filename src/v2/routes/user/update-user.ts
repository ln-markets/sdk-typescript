import type { KyInstance } from 'ky'

import snakecaseKeys from 'snakecase-keys'

import type { User } from './types.js'

export const createUpdateUser = (instance: KyInstance) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/userupdate
   */
  return async (body: {
    autoWithdrawEnabled?: boolean
    autoWithdrawLightningAddress?: boolean
    nostrPubkey?: string
    showLeaderboard?: boolean
    username?: string
    useTaprootAddresses?: boolean
  }) =>
    instance
      .put('user', {
        json: snakecaseKeys(body),
      })
      .json<User>()
}
