import type { RestFetcher } from '../../rest.js'

export const createGetBitcoinAddresses = (request: RestFetcher) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/usergetbitcoinaddresses
   */
  return async (query?: { current: boolean }) =>
    request({
      method: 'GET',
      path: '/user/bitcoin/addresses',
      query,
      requireAuth: true,
    }) as Promise<
      {
        address: string
        creationTs: number
        isUsed: boolean
      }[]
    >
}
