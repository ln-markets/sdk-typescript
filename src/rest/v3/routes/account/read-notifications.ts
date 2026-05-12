import type { KyInstance } from 'ky'

type ReadNotifications = () => Promise<void>

export const createReadNotifications = (
  instance: KyInstance
): ReadNotifications => {
  return async () => {
    await instance.put('account/notifications').json()
  }
}
