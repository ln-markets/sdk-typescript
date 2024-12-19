import type { UUID } from '../../index.js'
import type { RestFetcher } from '../../rest.js'

export const createGetFixingHistory = (request: RestFetcher) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/futuresgetfixinghistory
   */
  return async (query?: { from: number; limit?: number; to: number }) =>
    request({
      method: 'GET',
      path: '/futures/history/fixing',
      query,
    }) as Promise<
      {
        feeRate: number
        id: UUID
        price: number
        time: number
      }[]
    >
}
