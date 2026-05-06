import type { KyInstance } from 'ky'

export interface GetBestPriceOutput {
  askPrice: number
  bidPrice: number
}

type GetBestPrice = () => Promise<GetBestPriceOutput>

export const createGetBestPrice = (instance: KyInstance): GetBestPrice => {
  return async () => {
    return instance.get('synthetic-usd/best-price').json()
  }
}
