import type { KyInstance } from 'ky'

export const createMarkAllAsRead = (instance: KyInstance) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/notificationsmarkallnotificationsasread
   */
  return async () => instance.delete('notifications/all').json()
}
