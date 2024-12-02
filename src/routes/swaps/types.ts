import type { UUID } from '#src/index.js'

export enum SwapAsset {
  BTC = 'BTC',
  USD = 'USD',
}

export enum SwapSource {
  Deposit = 'deposit',
  FeeRefund = 'fee-refund',
  Swap = 'swap',
  Withdrawal = 'withdrawal',
  WithdrawalFailed = 'withdrawal-failed',
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
