import type { KyInstance } from 'ky'

import type { PerpInstrument } from './perp/types.js'

export type MarketStatus =
  | 'early_access:closed'
  | 'early_access:open'
  | 'hidden'
  | 'released'

export type MarketQuantityUnit = 'bbl' | 'btc' | 'oz' | 'share' | 'usd'

interface MarketBase {
  baseAsset: string
  displayName: string
  feature?: string
  id: string
  pair: string
  quantityStep: number
  quantityUnit: MarketQuantityUnit
  quoteAsset: string
  slug: string
  status: MarketStatus
  symbol: string
  ticker: string
  tickSize: number
}

export interface PerpMarket extends MarketBase {
  fundingIntervalHours: number
  instrument: PerpInstrument
  limits: {
    cross: {
      maxOrderCount: number
      maxOrderQuantity: number
      maxQuantityAtMaxLeverage: number
      maxQuantityAtMinLeverage: number
    }
    maxAccountQuantity: number
    maxOrderQuantity: number
    maxTradeCount: number
  }
  marginModes: ('cross' | 'isolated')[]
  maxLeverage: number
}

export interface SpotMarket extends MarketBase {
  instrument: 'quanto_spot'
  limits: {
    maxAccountQuantity: number
    maxOrderQuantity: number
    maxTradeCount: number
  }
}

export type Market = PerpMarket | SpotMarket

export type MarketsOutput = Market[]

type Markets = () => Promise<MarketsOutput>

export const createMarketsRoute = (instance: Readonly<KyInstance>): Markets => {
  return async () => {
    return instance.get('markets').json()
  }
}
