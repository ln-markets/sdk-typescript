// ============================================================================
// Common Types
// ============================================================================

export interface PaginationInput {
  from?: string
  limit?: number
  to?: string
}

// ============================================================================
// Futures Cross Types (Shared across multiple routes)
// ============================================================================

export interface FuturesCrossCanceledOrder {
  canceled: true
  canceledAt: Date
  createdAt: Date
  filled: false
  filledAt: null
  id: string
  open: false
  price: number
  quantity: number
  side: 'b' | 's'
  tradingFee: number
  type: 'limit'
  uid: string
}

export type FuturesCrossOrder =
  | {
      canceled: false
      canceledAt: null
      createdAt: Date
      filled: false
      filledAt: null
      id: string
      open: true
      price: number
      quantity: number
      side: 'b' | 's'
      tradingFee: number
      type: 'limit'
      uid: string
    }
  | {
      canceled: false
      canceledAt: null
      createdAt: Date
      filled: true
      filledAt: Date
      id: string
      open: false
      price: number
      quantity: number
      side: 'b' | 's'
      tradingFee: number
      type: 'limit' | 'liquidation' | 'market'
      uid: string
    }
  | {
      canceled: true
      canceledAt: Date
      createdAt: Date
      filled: false
      filledAt: null
      id: string
      open: false
      price: number
      quantity: number
      side: 'b' | 's'
      tradingFee: number
      type: 'limit'
      uid: string
    }

export interface FuturesCrossPosition {
  deltaPl: number
  entryPrice: null | number
  fundingFees: number
  id: string
  initialMargin: number
  leverage: number
  liquidation: null | number
  maintenanceMargin: number
  margin: number
  quantity: number
  runningMargin: number
  totalPl: number
  tradingFees: number
  uid: string
  updatedAt: Date
}

// ============================================================================
// Futures Isolated Types (Shared across multiple routes)
// ============================================================================

export type FuturesCanceledTrade = FuturesTrade & {
  canceled: true
  closed: false
  closedAt: number
  filledAt: undefined
  open: false
  running: false
  type: 'l'
}

export type FuturesClosedTrade = FuturesTrade & {
  canceled: false
  closed: true
  closedAt: number
  exitPrice: number
  filledAt: number
  open: false
  running: false
}

export type FuturesOpenOrRunningTrade = FuturesOpenTrade | FuturesRunningTrade

export type FuturesOpenTrade = FuturesTrade & {
  canceled: false
  closed: false
  closedAt: undefined
  filledAt: undefined
  running: false
  type: 'l'
}

export type FuturesRunningTrade = FuturesTrade & {
  canceled: false
  closed: false
  closedAt: undefined
  filledAt: number
  running: true
}

export interface FuturesTrade {
  canceled: boolean
  closed: boolean
  closedAt?: string
  closingFee: number
  createdAt: string
  entryMargin?: number
  entryPrice?: number
  exitPrice?: number
  filledAt?: string
  id: string
  leverage: number
  liquidation: number
  maintenanceMargin: number
  margin: number
  open: boolean
  openingFee: number
  pl: number
  price: number
  quantity: number
  running: boolean
  side: FuturesTradeSide
  stoploss: number
  sumFundingFees: number
  takeprofit: number
  type: FuturesTradeType
  uid: string
}

export type FuturesTradeSide = 'b' | 's'

export type FuturesTradeStatus = 'closed' | 'open' | 'running'

export type FuturesTradeType = 'l' | 'm'

// ============================================================================
// Funding Fees Types (Shared across multiple routes)
// ============================================================================

export interface FundingFees {
  fee: number
  settlementId: string
  time: string
  tradeId: null | string
}
