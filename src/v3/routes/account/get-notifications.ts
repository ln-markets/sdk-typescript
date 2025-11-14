import type { KyInstance } from 'ky'
import type { PaginatedResponse, PaginationInput } from '../../types.js'

export interface GetNotificationsInput extends PaginationInput {
  read?: boolean
}

interface Notification {
  id: string
  createdAt: string
  event: string
  // oxlint-disable-next-line no-explicit-any -- Type this better later
  data: any
}

export type GetNotificationsOutput = PaginatedResponse<Notification>

type GetNotifications = (
  input?: GetNotificationsInput
) => Promise<GetNotificationsOutput>

export const createGetNotifications = (
  instance: KyInstance
): GetNotifications => {
  return async ({ cursor, from, limit, to, read } = {}) => {
    return instance
      .get('account/notifications', {
        searchParams: { cursor, from, limit, to, read },
      })
      .json()
  }
}
