import type { KyInstance } from 'ky'

import { createGetBestPrice } from './get-best-price.js'
import { createGetSwaps } from './get-swaps.js'
import { createNewSwap } from './new-swap.js'

export const createSyntheticUsdRoutes = (instance: KyInstance) => ({
  getBestPrice: createGetBestPrice(instance),
  getSwaps: createGetSwaps(instance),
  newSwap: createNewSwap(instance),
})

export type * from './get-best-price.js'
export type * from './get-swaps.js'
export type * from './new-swap.js'
