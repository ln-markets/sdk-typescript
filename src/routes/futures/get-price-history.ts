import type { RestFetcher } from '../../rest.js'

export const createGetPriceHistory = (request: RestFetcher) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/futuresgetpricehistory
   */
  return async (query?: { from: number; limit?: number; to: number }) =>
    request<
      {
        time: number
        value: number
      }[]
    >({
      method: 'GET',
      path: '/futures/history/price',
      query,
    })
}
