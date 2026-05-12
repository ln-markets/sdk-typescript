import type { KyInstance } from 'ky'

import type { PaginationInput } from '../../types.js'

export type GetLastPriceInput = PaginationInput

export type GetLastPriceOutput = {
  lastPrice: number
  time: string
}[]

type GetLastPrice = (
  input?: Readonly<GetLastPriceInput>
) => Promise<GetLastPriceOutput>

export const createGetLastPrice = (
  instance: Readonly<KyInstance>
): GetLastPrice => {
  return async ({ from, limit, to } = {}) => {
    return instance
      .get('oracle/last-price', {
        searchParams: { from, limit, to },
      })
      .json()
  }
}
