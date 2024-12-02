import type { UUID } from '#src/index.js'

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
