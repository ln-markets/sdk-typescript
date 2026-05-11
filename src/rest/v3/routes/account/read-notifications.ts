import type { KyInstance } from 'ky'

type ReadNotifications = () => Promise<void>

export const createReadNotifications = (
  instance: Readonly<KyInstance>
): ReadNotifications => {
  return async () => {
    await instance.put('account/notifications').json()
  }
}
