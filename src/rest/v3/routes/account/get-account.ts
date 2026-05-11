import type { KyInstance } from 'ky'

export interface GetAccountOutput {
  balance: number
  email: null | string
  feeTier: number
  id: string
  linkingpublickey: null | string
  syntheticUsdBalance: number
  username: string
}

type GetAccount = () => Promise<GetAccountOutput>

export const createGetAccount = (
  instance: Readonly<KyInstance>
): GetAccount => {
  return async () => {
    return instance.get('account').json()
  }
}
