import type { KyInstance } from 'ky'

export interface AddBitcoinAddressInput {
  format?: 'p2tr' | 'p2wpkh'
}

export interface AddBitcoinAddressOutput {
  address: string
  createdAt: Date
}

type AddBitcoinAddress = (
  input?: AddBitcoinAddressInput
) => Promise<AddBitcoinAddressOutput>

export const createAddBitcoinAddress = (
  instance: KyInstance
): AddBitcoinAddress => {
  return async (input) => {
    return instance.post('account/address/bitcoin', { json: input }).json()
  }
}
