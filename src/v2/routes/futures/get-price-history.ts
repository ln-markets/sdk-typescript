import type { KyInstance } from 'ky'

export const createGetPriceHistory = (instance: KyInstance) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/futuresgetpricehistory
   */
  return async (searchParams?: { from: number; limit?: number; to: number }) =>
    instance.get('futures/history/price', { searchParams }).json<
      {
        time: number
        value: number
      }[]
    >()
}
