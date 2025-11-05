import type { KyInstance } from 'ky'

export interface GetBitcoinAddressOutput {
  address: string
}

type GetBitcoinAddress = () => Promise<GetBitcoinAddressOutput>

export const createGetBitcoinAddress = (
  instance: KyInstance
): GetBitcoinAddress => {
  return async () => {
    return instance.get('account/address/bitcoin').json()
  }
}
