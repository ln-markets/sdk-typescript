import type { KyInstance } from 'ky'

export const createGetBitcoinAddresses = (instance: KyInstance) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/usergetbitcoinaddresses
   */
  return async (searchParams: { current: boolean }) =>
    instance.get('user/bitcoin/addresses', { searchParams }).json<
      {
        address: string
        creationTs: number
        isUsed: boolean
      }[]
    >()
}
