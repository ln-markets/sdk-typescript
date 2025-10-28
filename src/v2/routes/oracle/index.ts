import type { KyInstance } from 'ky'

import { createGetIndex } from './get-index.js'
import { createGetLastPrice } from './get-last-price.js'

export const createOracleRouter = (instance: KyInstance) => {
  return {
    getIndex: createGetIndex(instance),
    getLastPrice: createGetLastPrice(instance),
  }
}
