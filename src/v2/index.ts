import type { Options } from './instance.js'

import { createInstance } from './instance.js'
import { createFuturesRouter } from './routes/futures/index.js'
import { createNotificationsRouter } from './routes/notifications/index.js'
import { createOptionsRouter } from './routes/options/index.js'
import { createOracleRouter } from './routes/oracle/index.js'
import { createSwapsRouter } from './routes/swaps/index.js'
import { createUserRouter } from './routes/user/index.js'

export const createHttpClient = (options?: Options) => {
  const instance = createInstance({ ...options })

  return {
    futures: createFuturesRouter(instance),
    notifications: createNotificationsRouter(instance),
    options: createOptionsRouter(instance),
    oracle: createOracleRouter(instance),
    swaps: createSwapsRouter(instance),
    user: createUserRouter(instance),
  }
}

export type HttpClient = ReturnType<typeof createHttpClient>

export type * from './routes/futures/types.js'
export type * from './routes/notifications/types.js'
export type * from './routes/options/types.js'
export type * from './routes/swaps/types.js'
export type * from './routes/user/types.js'
