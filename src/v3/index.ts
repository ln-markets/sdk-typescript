import type { Options } from './instance.js'

import { createInstance } from './instance.js'
import { createAccountRoute } from './routes/account/index.js'
import { createFuturesRoute } from './routes/futures/index.js'
import { createOracleRoutes } from './routes/oracle/index.js'
import { createPing } from './routes/ping.js'
import { createSyntheticUsdRoutes } from './routes/synthetic-usd/index.js'
import { createTimeRoute } from './routes/time.js'

export const createHttpClient = (options?: Options) => {
  const instance = createInstance({ ...options })

  return {
    account: createAccountRoute(instance),
    futures: createFuturesRoute(instance),
    oracle: createOracleRoutes(instance),
    ping: createPing(instance),
    syntheticUsd: createSyntheticUsdRoutes(instance),
    time: createTimeRoute(instance),
  }
}

export type HttpClient = ReturnType<typeof createHttpClient>

export type * from './routes/account/index.js'
export type * from './routes/futures/index.js'
export type * from './routes/oracle/index.js'
export type * from './routes/ping.js'
export type * from './routes/synthetic-usd/index.js'
export type * from './routes/time.js'
export type * from './types.js'
