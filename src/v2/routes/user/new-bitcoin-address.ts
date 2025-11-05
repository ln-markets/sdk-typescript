import type { KyInstance } from 'ky'

export const createNewBitcoinAddress = (instance: KyInstance) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/usernewbitcoinaddress
   */
  return async (body: { format: 'p2tr' | 'p2wpkh' }) =>
    instance
      .post('user/bitcoin/address', {
        json: body,
      })
      .json<{
        address: string
        creationTs: number
      }>()
}
