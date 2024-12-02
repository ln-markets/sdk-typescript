import type { RestFetcher } from '#src/rest.js'

export const createMarkAllAsRead = (request: RestFetcher) => {
  return async () =>
    request({
      method: 'DELETE',
      path: '/notifications/all',
      requireAuth: true,
    }) as Promise<void>
}
