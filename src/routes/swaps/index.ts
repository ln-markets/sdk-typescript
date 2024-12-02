import type { RestFetcher } from '#src/rest.js'

import { createGetSwapBySourceId } from './get-swap-by-source-id.js'
import { createGetSwap } from './get-swap.js'
import { createGetSwaps } from './get-swaps.js'
import { createNewSwap } from './new-swap.js'

export const createSwapsRouter = (request: RestFetcher) => {
  return {
    getSwap: createGetSwap(request),
    getSwapBySourceId: createGetSwapBySourceId(request),
    getSwaps: createGetSwaps(request),
    newSwap: createNewSwap(request),
  }
}
