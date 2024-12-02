import type { RestFetcher } from '#src/rest.js'
import type { UUID } from '#src/types.js'

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
