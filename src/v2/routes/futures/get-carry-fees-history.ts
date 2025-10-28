import type { KyInstance } from 'ky'

export const createGetCarryFeesHistory = (instance: KyInstance) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/futuresgetcarryfees
   */
  return async (searchParams?: { from: number; limit?: number; to: number }) =>
    instance.get('futures/carry-fees', { searchParams }).json<
      {
        fee: number
        fixingId: string
        id: string
        ts: number
      }[]
    >()
}
