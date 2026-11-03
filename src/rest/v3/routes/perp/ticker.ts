import type { KyInstance } from 'ky'

import type { PerpMarketKey } from './types.js'

export type PerpGetTickerInput = PerpMarketKey

export interface PerpGetTickerOutput extends PerpMarketKey {
  exchangesWeights: Partial<Record<'binance' | 'bybit' | 'okx', number>>
  fundingRate: number
  fundingTime: string
  lastPrice: number
  mark: number
  priceChange24h?: {
    ratio: number
    updatedAt: string
  }
  prices: {
    askPrice?: number
    bidPrice?: number
    maxSize: number
    minSize: number
  }[]
  quantoAdjustmentRate: number
  time: string
  volume24h?: number
}

type GetTicker = (
  input: Readonly<PerpGetTickerInput>
) => Promise<PerpGetTickerOutput>

export const createGetTicker = (instance: Readonly<KyInstance>): GetTicker => {
  return async ({ instrument, pair }) => {
    return instance
      .get('perp/ticker', { searchParams: { instrument, pair } })
      .json()
  }
}
