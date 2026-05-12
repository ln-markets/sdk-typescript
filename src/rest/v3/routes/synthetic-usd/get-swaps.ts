import type { KyInstance } from 'ky'

import type { PaginatedResponse, PaginationInput } from '../../types.js'

export type GetSwapsInput = PaginationInput

interface Swap {
  createdAt: string
  id: string
  inAmount: number
  inAsset: 'BTC' | 'USD'
  outAmount: number
  outAsset: 'BTC' | 'USD'
}

export type GetSwapsOutput = PaginatedResponse<Swap>

type GetSwaps = (input?: Readonly<GetSwapsInput>) => Promise<GetSwapsOutput>

export const createGetSwaps = (instance: Readonly<KyInstance>): GetSwaps => {
  return async (input) => {
    return instance
      .get('synthetic-usd/swaps', {
        searchParams: { ...input },
      })
      .json()
  }
}
