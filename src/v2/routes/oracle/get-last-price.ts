import type { RestFetcher } from '../../rest.js'

export const createGetLastPrice = (request: RestFetcher) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/oraclegetlastprice
   */
  return async (query: { from: number; limit?: number; to: number }) =>
    request<{
      lastPrice: number
      time: number
    }>({
      method: 'GET',
      path: '/oracle/last-price',
      query,
    })
}
