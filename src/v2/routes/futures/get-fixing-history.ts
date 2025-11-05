import type { KyInstance } from 'ky'

export const createGetFixingHistory = (instance: KyInstance) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/futuresgetfixinghistory
   */
  return async (searchParams?: { from: number; limit?: number; to: number }) =>
    instance.get('futures/history/fixing', { searchParams }).json<
      {
        feeRate: number
        id: string
        price: number
        time: number
      }[]
    >()
}
