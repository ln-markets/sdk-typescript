import type { RestFetcher } from '../../rest.js'

export const createMarkAllAsRead = (request: RestFetcher) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/notificationsmarkallnotificationsasread
   */
  return async () =>
    request({
      method: 'DELETE',
      path: '/notifications/all',
      requireAuth: true,
    })
}
