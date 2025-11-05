import type { KyInstance } from 'ky'
import type { PaginationInput } from '../../types.js'

export type GetLastPriceInput = PaginationInput

export type GetLastPriceOutput = {
  lastPrice: number
  time: Date
}[]

type GetLastPrice = (input?: GetLastPriceInput) => Promise<GetLastPriceOutput>

export const createGetLastPrice = (instance: KyInstance): GetLastPrice => {
  return async (input) => {
    return instance
      .get('oracle/last-price', { searchParams: { ...input } })
      .json()
  }
}
