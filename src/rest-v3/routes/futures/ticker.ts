import type { KyInstance } from 'ky'

export interface GetTickerOutput {
  fundingRate: number
  fundingTime: string
  index: number
  lastPrice: number
  prices: {
    askPrice: number
    bidPrice: number
    maxSize: number
    minSize: number
  }[]
}

type GetTicker = () => Promise<GetTickerOutput>

export const createGetTicker = (instance: KyInstance): GetTicker => {
  return async () => {
    return instance.get('futures/ticker').json()
  }
}
