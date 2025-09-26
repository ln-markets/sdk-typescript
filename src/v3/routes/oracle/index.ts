import type { KyInstance } from 'ky'

import { createGetIndex } from './get-index.js'
import { createGetLastPrice } from './get-last-price.js'

export const createOracleRoutes = (instance: KyInstance) => ({
  getIndex: createGetIndex(instance),
  getLastPrice: createGetLastPrice(instance),
})

export type * from './get-index.js'
export type * from './get-last-price.js'
