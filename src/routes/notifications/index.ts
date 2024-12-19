import type { UUID } from '#src/index.js'
import type { RestFetcher } from '#src/rest.js'

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
