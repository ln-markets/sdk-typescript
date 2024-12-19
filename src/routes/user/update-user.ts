import type { RestFetcher } from '#src/rest.js'

import snakecaseKeys from 'snakecase-keys'

import type { User } from './index.js'

export const createUpdateUser = (request: RestFetcher) => {
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
    request({
      body: snakecaseKeys(body),
      method: 'PUT',
      path: '/user',
      requireAuth: true,
    }) as Promise<User>
}
