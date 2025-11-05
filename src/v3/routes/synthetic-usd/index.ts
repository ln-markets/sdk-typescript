import type { KyInstance } from 'ky'

import { createGetBestPrice } from './get-best-price.js'
import { createGetSwaps } from './get-swaps.js'
import { createNewSwap } from './new-swap.js'

export const createSyntheticUsdRoutes = (instance: KyInstance) => ({
  getBestPrice: createGetBestPrice(instance),
  getSwaps: createGetSwaps(instance),
  newSwap: createNewSwap(instance),
})

export type { GetBestPriceOutput } from './get-best-price.js'
export type { GetSwapsInput, GetSwapsOutput } from './get-swaps.js'
export type { NewSwapInput, NewSwapOutput } from './new-swap.js'
