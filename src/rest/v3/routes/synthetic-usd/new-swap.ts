import type { KyInstance } from 'ky'

export interface NewSwapOutput {
  inAmount: number
  inAsset: 'BTC' | 'USD'
  outAmount: number
  outAsset: 'BTC' | 'USD'
}

export interface NewSwapInput {
  inAmount: number
  inAsset: 'BTC' | 'USD'
  outAsset: 'BTC' | 'USD'
}

type NewSwap = (input: NewSwapInput) => Promise<NewSwapOutput>

export const createNewSwap = (instance: KyInstance): NewSwap => {
  return async ({ inAmount, inAsset, outAsset }) => {
    return instance
      .post('synthetic-usd/swap', { json: { inAmount, inAsset, outAsset } })
      .json()
  }
}
