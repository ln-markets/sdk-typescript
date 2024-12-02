import type { RestFetcher } from '#src/rest.js'

export const createGetIndexHistory = (request: RestFetcher) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/futuresgetindexhistory
   */
  return async (query?: { from: number; limit?: number; to: number }) =>
    request({
      method: 'GET',
      path: '/futures/history/index',
      query,
    }) as Promise<
      {
        time: number
        value: number
      }[]
    >
}
