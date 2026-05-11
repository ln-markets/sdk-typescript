import type { KyInstance } from 'ky'

export interface AddBitcoinAddressInput {
  format?: 'p2tr' | 'p2wpkh'
}

export interface AddBitcoinAddressOutput {
  address: string
  createdAt: string
}

type AddBitcoinAddress = (
  input?: Readonly<AddBitcoinAddressInput>
) => Promise<AddBitcoinAddressOutput>

export const createAddBitcoinAddress = (
  instance: Readonly<KyInstance>
): AddBitcoinAddress => {
  return async (input) => {
    return instance.post('account/address/bitcoin', { json: input }).json()
  }
}
