import type { KyInstance } from 'ky'

import { createGetSwapBySourceId } from './get-swap-by-source-id.js'
import { createGetSwap } from './get-swap.js'
import { createGetSwaps } from './get-swaps.js'
import { createNewSwap } from './new-swap.js'

export const createSwapsRouter = (instance: KyInstance) => {
  return {
    getSwap: createGetSwap(instance),
    getSwapBySourceId: createGetSwapBySourceId(instance),
    getSwaps: createGetSwaps(instance),
    newSwap: createNewSwap(instance),
  }
}
