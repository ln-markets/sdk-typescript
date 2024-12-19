import type { UUID } from '../../index.js'
import type { RestFetcher } from '../../rest.js'

import { createGetAllNotifications } from './get-all.js'
import { createMarkAllAsRead } from './mark-all-as-read.js'

export const createNotificationsRouter = (request: RestFetcher) => {
  return {
    getAll: createGetAllNotifications(request),
    markAllAsRead: createMarkAllAsRead(request),
  }
}

export type Notification = {
  creationTs: number
  data: unknown
  event: string
  id: UUID
}
