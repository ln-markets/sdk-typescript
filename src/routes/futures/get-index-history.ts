import type { RestFetcher } from '../../rest.js'

export const createGetIndexHistory = (request: RestFetcher) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/futuresgetindexhistory
   */
  return async (query?: { from: number; limit?: number; to: number }) =>
    request<
      {
        time: number
        value: number
      }[]
    >({
      method: 'GET',
      path: '/futures/history/index',
      query,
    })
}
