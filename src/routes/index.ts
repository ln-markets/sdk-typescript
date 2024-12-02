import type { RestFetcher } from '#src/rest.js'

import { createFuturesRouter } from './futures/index.js'
import { createNotificationsRouter } from './notifications/index.js'
import { createOptionsRouter } from './options/index.js'
import { createOracleRouter } from './oracle/index.js'
import { createSwapsRouter } from './swaps/index.js'
import { createUserRouter } from './user/index.js'

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
