import type { RestFetcher } from '#src/rest.js'

import type { Notification } from './index.js'

export const createGetAllNotifications = (request: RestFetcher) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/notificationsfetchnotifications
   */
  return async () =>
    request({
      method: 'GET',
      path: '/notifications',
      requireAuth: true,
    }) as Promise<Notification[]>
}
