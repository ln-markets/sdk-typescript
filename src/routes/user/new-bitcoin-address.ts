import type { RestFetcher } from '../../rest.js'

export const createNewBitcoinAddress = (request: RestFetcher) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/usernewbitcoinaddress
   */
  return async (body: { format: 'p2tr' | 'p2wpkh' }) =>
    request<{
      address: string
      creationTs: number
    }>({
      body,
      method: 'POST',
      path: '/user/bitcoin/address',
      requireAuth: true,
    })
}
