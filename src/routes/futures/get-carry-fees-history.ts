import type { UUID } from '../../index.js'
import type { RestFetcher } from '../../rest.js'

export const createGetCarryFeesHistory = (request: RestFetcher) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/futuresgetcarryfees
   */
  return async (query: { from: number; limit?: number; to: number }) =>
    request({
      method: 'GET',
      path: '/futures/carry-fees',
      query,
    }) as Promise<
      {
        fee: number
        fixingId: UUID
        id: UUID
        ts: number
      }[]
    >
}
