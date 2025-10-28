import type { UUID } from '../../index.js'

export type FuturesCanceledTrade = FuturesTrade & {
  canceled: true
  closed: false
  closedTs: number
  marketFilledTs: undefined
  open: false
  running: false
  type: 'l'
}

export type FuturesClosedTrade = FuturesTrade & {
  canceled: false
  closed: true
  closedTs: number
  exitPrice: number
  marketFilledTs: number
  open: false
  running: false
}

export interface FuturesMarketDetails {
  active: boolean
  fees: {
    carry: {
      hours: number[]
      min: number
    }
    trading: {
      tiers: {
        fees: number
        minVolume: number
      }[]
    }
  }
  limits: {
    count: {
      max: number
    }
    leverage: {
      max: number
      min: number
    }
    quantity: {
      max: number
      min: number
      trade: number
    }
  }
}

export type FuturesOpenOrRunningTrade = FuturesOpenTrade | FuturesRunningTrade

export type FuturesOpenTrade = FuturesTrade & {
  canceled: false
  closed: false
  closedTs: undefined
  marketFilledTs: undefined
  running: false
  type: 'l'
}

export type FuturesRunningTrade = FuturesTrade & {
  canceled: false
  closed: false
  closedTs: undefined
  marketFilledTs: number
  running: true
}

export interface FuturesTicker {
  askPrice: number
  bidPrice: number
  carryFeeRate: number
  carryFeeTimestamp: number
  index: number
  lastPrice: number
}

export interface FuturesTrade {
  canceled: boolean
  closed: boolean
  closedTs?: number
  closingFee: number
  creationTs: number
  entryMargin?: number
  entryPrice?: number
  exitPrice?: number
  id: UUID
  lastUpdateTs: number
  leverage: number
  liquidation: number
  maintenanceMargin: number
  margin: number
  marketFilledTs?: number
  open: boolean
  openingFee: number
  pl: number
  price: number
  quantity: number
  running: boolean
  side: FuturesTradeSide
  sumCarryFees: number
  type: FuturesTradeType
  uid: UUID
}

export type FuturesTradeSide = 'b' | 's'

export type FuturesTradeStatus = 'closed' | 'open' | 'running'

export type FuturesTradeType = 'l' | 'm'

export interface OHLC {
  close: number
  high: number
  low: number
  open: number
  time: number
  volume: number
}

export type OHLCRange =
  | '1'
  | '1D'
  | '1M'
  | '1W'
  | '3'
  | '3M'
  | '5'
  | '15'
  | '30'
  | '60'
  | '120'
  | '240'
