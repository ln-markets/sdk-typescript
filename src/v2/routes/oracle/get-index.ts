import type { RestFetcher } from '../../rest.js'

export const createGetIndex = (request: RestFetcher) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/oraclegetindex
   */
  return async (query: { from: number; limit?: number; to: number }) =>
    request<
      {
        index: number
        time: number
      }[]
    >({
      method: 'GET',
      path: '/oracle',
      query,
    })
}
