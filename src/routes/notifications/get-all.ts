import type { RestFetcher } from '../../rest.js'
import type { Notification } from './index.js'

export const createGetAllNotifications = (request: RestFetcher) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/notificationsfetchnotifications
   */
  return async () =>
    request<Notification[]>({
      method: 'GET',
      path: '/notifications',
      requireAuth: true,
    })
}
