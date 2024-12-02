import type { RestFetcher } from '#src/rest.js'

import type { Notification } from './types.js'

export const createGetAllNotifications = (request: RestFetcher) => {
  return async () =>
    request({
      method: 'GET',
      path: '/notifications',
      requireAuth: true,
    }) as Promise<Notification[]>
}
