export interface Swap {
  creationTs: number
  id: string
  inAmount: number
  inAsset: SwapAsset
  outAmount: number
  outAsset: SwapAsset
  source?: SwapSource
  sourceId?: string
  uid: string
}

export type SwapAsset = 'BTC' | 'USD'

export type SwapSource =
  | 'deposit'
  | 'fee-refund'
  | 'swap'
  | 'withdrawal'
  | 'withdrawal-failed'
