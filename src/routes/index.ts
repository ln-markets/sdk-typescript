import type { RestFetcher } from '../rest.js'

import { createFuturesRouter } from './futures/index.js'
import { createNotificationsRouter } from './notifications/index.js'
import { createOptionsRouter } from './options/index.js'
import { createOracleRouter } from './oracle/index.js'
import { createSwapsRouter } from './swaps/index.js'
import { createUserRouter } from './user/index.js'

export type * from './futures/index.js'
export type * from './notifications/index.js'
export type * from './options/index.js'
export type * from './oracle/index.js'
export type * from './swaps/index.js'
export type * from './user/index.js'

export const createRouter = (request: RestFetcher) => {
  return {
    futures: createFuturesRouter(request),
    notifications: createNotificationsRouter(request),
    options: createOptionsRouter(request),
    oracle: createOracleRouter(request),
    swaps: createSwapsRouter(request),
    user: createUserRouter(request),
  }
}
