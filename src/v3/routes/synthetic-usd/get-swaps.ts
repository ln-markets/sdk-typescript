import type { KyInstance } from 'ky'
import type { PaginationInput } from '../../types.js'

export type GetSwapsInput = PaginationInput

export type GetSwapsOutput = {
  createdAt: Date
  id: string
  inAmount: number
  inAsset: 'BTC' | 'USD'
  outAmount: number
  outAsset: 'BTC' | 'USD'
}[]

type GetSwaps = (input: GetSwapsInput) => Promise<GetSwapsOutput>

export const createGetSwaps = (instance: KyInstance): GetSwaps => {
  return async ({ from, limit, to }) => {
    return instance
      .get('synthetic-usd/swaps', { searchParams: { from, limit, to } })
      .json()
  }
}
