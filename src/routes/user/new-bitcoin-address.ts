import type { RestFetcher } from '#src/rest.js'

export const createNewBitcoinAddress = (request: RestFetcher) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/usernewbitcoinaddress
   */
  return async (body: { format: 'p2tr' | 'p2wpkh' }) =>
    request({
      body,
      method: 'POST',
      path: '/user/bitcoin/address',
      requireAuth: true,
    }) as Promise<{
      address: string
      creationTs: number
    }>
}
