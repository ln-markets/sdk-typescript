// ============================================================================
// Common Types
// ============================================================================

export interface PaginationInput {
  cursor?: string
  from?: string
  limit?: number
  to?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  nextCursor: string | null
}

// ============================================================================
// Futures Cross Types (Shared across multiple routes)
// ============================================================================

export interface FuturesCrossCanceledOrder {
  canceled: true
  canceledAt: string
  createdAt: string
  filled: false
  filledAt: null
  id: string
  open: false
  price: number
  quantity: number
  side: 'buy' | 'sell'
  tradingFee: number
  type: 'limit'
  uid: string
}

export type FuturesCrossOrder =
  | {
      canceled: false
      canceledAt: null
      createdAt: string
      filled: false
      filledAt: null
      id: string
      open: true
      price: number
      quantity: number
      side: 'buy' | 'sell'
      tradingFee: number
      type: 'limit'
      uid: string
    }
  | {
      canceled: false
      canceledAt: null
      createdAt: string
      filled: true
      filledAt: string
      id: string
      open: false
      price: number
      quantity: number
      side: 'buy' | 'sell'
      tradingFee: number
      type: 'limit' | 'liquidation' | 'market'
      uid: string
    }
  | {
      canceled: true
      canceledAt: string
      createdAt: string
      filled: false
      filledAt: null
      id: string
      open: false
      price: number
      quantity: number
      side: 'buy' | 'sell'
      tradingFee: number
      type: 'limit'
      uid: string
    }

export interface FuturesCrossPosition {
  deltaPl: number
  entryPrice: number | null
  fundingFees: number
  id: string
  initialMargin: number
  leverage: number
  liquidation: number | null
  maintenanceMargin: number
  margin: number
  quantity: number
  runningMargin: number
  totalPl: number
  tradingFees: number
  uid: string
  updatedAt: string
}

// ============================================================================
// Futures Isolated Types (Shared across multiple routes)
// ============================================================================
export type FuturesTradeSide = 'buy' | 'sell'

export type FuturesTradeStatus = 'closed' | 'open' | 'running'

export type FuturesTradeType = 'limit' | 'market'

export interface FuturesTrade {
  canceled: boolean
  closed: boolean
  closedAt: string | null
  closingFee: number
  createdAt: string
  entryMargin: number
  entryPrice: number | null
  exitPrice: number | null
  filledAt: string | null
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
  clientId: string | null
}

export type FuturesCanceledTrade = FuturesTrade & {
  canceled: true
  closed: false
  closedAt: string
  filledAt: null
  open: false
  running: false
  type: 'limit'
}

export type FuturesClosedTrade = FuturesTrade & {
  canceled: false
  closed: true
  closedAt: string
  exitPrice: number
  filledAt: string
  open: false
  running: false
}

export type FuturesOpenOrRunningTrade = FuturesOpenTrade | FuturesRunningTrade

export type FuturesOpenTrade = FuturesTrade & {
  canceled: false
  closed: false
  closedAt: null
  filledAt: null
  running: false
  type: 'limit'
}

export type FuturesRunningTrade = FuturesTrade & {
  canceled: false
  closed: false
  closedAt: null
  filledAt: null
  running: true
}

// ============================================================================
// Funding Fees Types (Shared across multiple routes)
// ============================================================================

export interface FundingFees {
  fee: number
  settlementId: string
  time: string
  tradeId: null | string
}
