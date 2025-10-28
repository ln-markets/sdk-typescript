import type { KyInstance } from 'ky'

export const createGetIndex = (instance: KyInstance) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/oraclegetindex
   */
  return async (searchParams?: { from: number; limit?: number; to: number }) =>
    instance.get('oracle', { searchParams }).json<
      {
        index: number
        time: number
      }[]
    >()
}
