import type { KyInstance } from 'ky'

export const createGetIndexHistory = (instance: KyInstance) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/futuresgetindexhistory
   */
  return async (searchParams?: { from: number; limit?: number; to: number }) =>
    instance.get('futures/history/index', { searchParams }).json<
      {
        time: number
        value: number
      }[]
    >()
}
