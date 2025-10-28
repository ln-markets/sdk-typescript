import type { KyInstance } from 'ky'

import { createFuturesRouter } from './futures/index.js'
import { createNotificationsRouter } from './notifications/index.js'
import { createOptionsRouter } from './options/index.js'
import { createOracleRouter } from './oracle/index.js'
import { createSwapsRouter } from './swaps/index.js'
import { createUserRouter } from './user/index.js'

export const createRouter = (instance: KyInstance) => {
  return {
    futures: createFuturesRouter(instance),
    notifications: createNotificationsRouter(instance),
    options: createOptionsRouter(instance),
    oracle: createOracleRouter(instance),
    swaps: createSwapsRouter(instance),
    user: createUserRouter(instance),
  }
}
