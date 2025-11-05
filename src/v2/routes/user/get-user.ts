import type { KyInstance } from 'ky'

import type { User } from './types.js'

export const createGetUser = (instance: KyInstance) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/usergetuser
   */
  return async () => instance.get('user').json<User>()
}
