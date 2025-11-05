import type { KyInstance } from 'ky'

export const createGetLastPrice = (instance: KyInstance) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/oraclegetlastprice
   */
  return async (searchParams?: { from: number; limit?: number; to: number }) =>
    instance.get('oracle/last-price', { searchParams }).json<{
      lastPrice: number
      time: number
    }>()
}
