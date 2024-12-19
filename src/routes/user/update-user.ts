import snakecaseKeys from 'snakecase-keys'

import type { RestFetcher } from '../../rest.js'
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
    request<User>({
      body: snakecaseKeys(body),
      method: 'PUT',
      path: '/user',
      requireAuth: true,
    })
}
