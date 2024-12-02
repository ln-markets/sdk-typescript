import type { RestFetcher } from '#src/rest.js'

export const createGetIndex = (request: RestFetcher) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/oraclegetindex
   */
  return async (query: { from: number; limit?: number; to: number }) =>
    request({
      method: 'GET',
      path: '/oracle',
      query,
    }) as Promise<
      {
        index: number
        time: number
      }[]
    >
}
