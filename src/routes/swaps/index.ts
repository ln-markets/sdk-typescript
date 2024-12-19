import type { UUID } from '#src/index.js'
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

export type Swap = {
  creationTs: number
  id: UUID
  inAmount: number
  inAsset: SwapAsset
  outAmount: number
  outAsset: SwapAsset
  source?: SwapSource
  sourceId?: UUID
  uid: UUID
}

export type SwapAsset = 'BTC' | 'USD'

export type SwapSource =
  | 'deposit'
  | 'fee-refund'
  | 'swap'
  | 'withdrawal'
  | 'withdrawal-failed'
