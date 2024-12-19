import type { UUID } from '../../index.js'
import type { RestFetcher } from '../../rest.js'

import { createAddMargin } from './add-margin.js'
import { createCancelAllTrades } from './cancel-all-trades.js'
import { createCancelTrade } from './cancel-trade.js'
import { createCashIn } from './cash-in.js'
import { createCloseAllTrades } from './close-all-trades.js'
import { createCloseTrade } from './close-trade.js'
import { createGetCarryFeesHistory } from './get-carry-fees-history.js'
import { createGetFixingHistory } from './get-fixing-history.js'
import { createGetIndexHistory } from './get-index-history.js'
import { createGetLeaderboard } from './get-leaderboard.js'
import { createGetMarketDetails } from './get-market-details.js'
import { createGetOHLCHistory } from './get-ohlc-history.js'
import { createGetPriceHistory } from './get-price-history.js'
import { createGetTicker } from './get-ticker.js'
import { createGetTrade } from './get-trade.js'
import { createGetTrades } from './get-trades.js'
import { createNewTrade } from './new-trade.js'
import { createUpdateTrade } from './update-trade.js'

export const createFuturesRouter = (request: RestFetcher) => {
  return {
    addMargin: createAddMargin(request),
    cancelAllTrades: createCancelAllTrades(request),
    cancelTrade: createCancelTrade(request),
    cashIn: createCashIn(request),
    closeAllTrades: createCloseAllTrades(request),
    closeTrade: createCloseTrade(request),
    getCarryFeesHistory: createGetCarryFeesHistory(request),
    getFixingHistory: createGetFixingHistory(request),
    getIndexHistory: createGetIndexHistory(request),
    getLeaderboard: createGetLeaderboard(request),
    getMarketDetails: createGetMarketDetails(request),
    getOHLCHistory: createGetOHLCHistory(request),
    getPriceHistory: createGetPriceHistory(request),
    getTicker: createGetTicker(request),
    getTrade: createGetTrade(request),
    getTrades: createGetTrades(request),
    newTrade: createNewTrade(request),
    updateTrade: createUpdateTrade(request),
  }
}

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

export type FuturesMarketDetails = {
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

export type FuturesTicker = {
  askPrice: number
  bidPrice: number
  carryFeeRate: number
  carryFeeTimestamp: number
  index: number
  lastPrice: number
}

export type FuturesTrade = {
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

export type OHLC = {
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
