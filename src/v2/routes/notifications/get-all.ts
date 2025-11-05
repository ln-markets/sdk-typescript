import type { KyInstance } from 'ky'

import type { Notification } from './types.js'

export const createGetAllNotifications = (instance: KyInstance) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/notificationsfetchnotifications
   */
  return async () => instance.get('notifications').json<Notification[]>()
}
