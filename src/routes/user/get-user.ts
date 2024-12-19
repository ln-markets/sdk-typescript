import type { RestFetcher } from '../../rest.js'
import type { User } from './types.js'

export const createGetUser = (request: RestFetcher) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/usergetuser
   */
  return async () =>
    request<User>({
      method: 'GET',
      path: '/user',
      requireAuth: true,
    })
}
