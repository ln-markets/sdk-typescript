import type { KyInstance } from 'ky'

import { createGetAllNotifications } from './get-all.js'
import { createMarkAllAsRead } from './mark-all-as-read.js'

export const createNotificationsRouter = (instance: KyInstance) => {
  return {
    getAll: createGetAllNotifications(instance),
    markAllAsRead: createMarkAllAsRead(instance),
  }
}
