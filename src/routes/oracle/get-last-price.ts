import type { RestFetcher } from '#src/rest.js'

export const createGetLastPrice = (request: RestFetcher) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/oraclegetlastprice
   */
  return async (query: { from: number; limit?: number; to: number }) =>
    request({
      method: 'GET',
      path: '/oracle/last-price',
      query,
    }) as Promise<{
      lastPrice: number
      time: number
    }>
}
