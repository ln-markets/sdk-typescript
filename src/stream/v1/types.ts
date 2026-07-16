// oxlint-disable eslint/max-lines -- exhaustive hand-mirror of stream/v1 contract; splitting across files would lose locality
// oxlint-disable typescript/consistent-indexed-object-style -- mapped template-literal types (`OhlcTopic`, `response:${string}`) cannot be expressed as Record without losing literal-key narrowing

// ============================================================================
// Options
// ============================================================================

export interface Options {
  network?: 'mainnet' | 'signet'
  reconnectInterval?: number
  reconnectEnabled?: boolean
  maxReconnectAttempts?: number
}

// ============================================================================
// Topic Primitives
// ============================================================================

export type Pair = 'btc_usd'

export type Instrument = 'inverse'

export type MarginMode = 'isolated' | 'cross'

export type OhlcResolution =
  | '1m'
  | '3m'
  | '5m'
  | '10m'
  | '15m'
  | '30m'
  | '45m'
  | '1h'
  | '2h'
  | '3h'
  | '4h'
  | '1d'
  | '1w'
  | '1month'
  | '3months'

// ============================================================================
// Topic Union
// ============================================================================

type ExplicitTopic =
  | 'announcements'
  | 'wallet/deposit'
  | 'wallet/withdrawal'
  | 'futures/inverse/btc_usd/ticker'
  | 'futures/inverse/btc_usd/lastPrice'
  | 'futures/inverse/btc_usd/index'
  | 'futures/inverse/btc_usd/buckets'
  | 'futures/inverse/btc_usd/funding'
  | 'futures/inverse/btc_usd/isolated/trades'
  | 'futures/inverse/btc_usd/cross/orders'
  | 'futures/inverse/btc_usd/cross/position'

export type OhlcTopic = `futures/inverse/${Pair}/ohlc/${OhlcResolution}`

export type Topic = ExplicitTopic | OhlcTopic

// ============================================================================
// Futures Payloads
// ============================================================================

export interface FuturesTickerData {
  time: number
  lastPrice: number | null
  index: number | null
  funding: {
    rate: number | null
    time: number | null
  }
}

export interface FuturesLastPriceData {
  time: number
  lastPrice: number
}

export interface FuturesIndexData {
  time: number
  index: number
}

export interface FuturesBucketData {
  time: number
  buckets: {
    minSize: number
    maxSize: number
    askPrice?: number
    bidPrice?: number
  }[]
}

export interface FuturesFundingData {
  pair: Pair
  current: {
    rate: number | null
    time: number | null
  }
}

// ============================================================================
// Isolated Trade Events (discriminated union — `event` literal)
// ============================================================================

export interface IsolatedTradeOpen {
  pair: Pair
  event: 'open'
  trade: {
    id: string
    side: 'buy' | 'sell'
    type: 'limit'
    quantity: number
    margin: number
    leverage: number
    price: number
    openingFee: number
    createdAt: number
    clientId: string | null
  }
}

export interface IsolatedTradeFilled {
  pair: Pair
  event: 'filled'
  trade: {
    id: string
    side: 'buy' | 'sell'
    type: 'limit' | 'market'
    quantity: number
    margin: number
    leverage: number
    price: number
    openingFee: number
    createdAt: number
    clientId: string | null
  }
}

export interface IsolatedTradeClosed {
  pair: Pair
  event: 'closed'
  trade: {
    id: string
    closedAt: number
    closingFee: number
    pl: number
    exitPrice: number
    clientId: string | null
  }
}

export interface IsolatedTradeCanceled {
  pair: Pair
  event: 'canceled'
  trade: {
    id: string
    closedAt: number
    clientId: string | null
  }
}

export interface IsolatedTradeLiquidation {
  pair: Pair
  event: 'liquidation'
  trade: {
    id: string
    closedAt: number
    closingFee: number
    exitPrice: number
    clientId: string | null
  }
}

export interface IsolatedTradeStoploss {
  pair: Pair
  event: 'stoploss'
  trade: {
    id: string
    closedAt: number
    closingFee: number
    pl: number
    exitPrice: number
    clientId: string | null
  }
}

export interface IsolatedTradeTakeprofit {
  pair: Pair
  event: 'takeprofit'
  trade: {
    id: string
    closedAt: number
    closingFee: number
    pl: number
    exitPrice: number
    clientId: string | null
  }
}

export interface IsolatedTradeFunding {
  pair: Pair
  event: 'funding'
  trade: {
    id: string
    margin: number
    liquidationPrice: number
    fundingFee: number
    fundedAt: number
    clientId: string | null
  }
}

export type IsolatedTradesEvent =
  | IsolatedTradeOpen
  | IsolatedTradeFilled
  | IsolatedTradeClosed
  | IsolatedTradeCanceled
  | IsolatedTradeLiquidation
  | IsolatedTradeStoploss
  | IsolatedTradeTakeprofit
  | IsolatedTradeFunding

// ============================================================================
// Cross Order Events (discriminated union — `event` literal)
// ============================================================================

export interface CrossOrderOpenPayload {
  id: string
  side: 'buy' | 'sell'
  type: 'limit'
  quantity: number
  price: number
  tradingFee: number
  clientId: string | null
  createdAt: number
}

export interface CrossOrderFilledPayload {
  id: string
  side: 'buy' | 'sell'
  type: 'limit' | 'liquidation' | 'market'
  quantity: number
  price: number
  tradingFee: number
  clientId: string | null
  createdAt: number
  filledAt: number
}

export interface CrossOrderCanceledPayload {
  id: string
  side: 'buy' | 'sell'
  type: 'limit'
  quantity: number
  price: number
  clientId: string | null
  createdAt: number
  canceledAt: number
}

export interface CrossOrderNew {
  pair: Pair
  event: 'new'
  order: CrossOrderOpenPayload | CrossOrderFilledPayload
}

export interface CrossOrderLimit {
  pair: Pair
  event: 'limit'
  order: CrossOrderFilledPayload
}

export interface CrossOrderCanceled {
  pair: Pair
  event: 'canceled'
  order: CrossOrderCanceledPayload
}

export type CrossOrderEvent =
  | CrossOrderNew
  | CrossOrderLimit
  | CrossOrderCanceled

// ============================================================================
// Cross Position Events (single shape — `event` is a literal-string union)
// ============================================================================

export interface CrossPositionData {
  pair: Pair
  event:
    | 'new'
    | 'limit'
    | 'cancel'
    | 'leverage'
    | 'deposit'
    | 'withdraw'
    | 'liquidation'
    | 'funding'
  position: {
    quantity: number
    leverage: number
    margin: number
    entryPrice: number | null
    liquidation: number | null
    totalPl: number
    fundingFees: number
    tradingFees: number
    initialMargin: number
    maintenanceMargin: number
    runningMargin: number
    deltaPl: number
    updatedAt: number
  }
}

// ============================================================================
// OHLC Payload
// ============================================================================

export interface OhlcData {
  time: number
  open: number
  high: number
  low: number
  close: number
  volume: number
}

// ============================================================================
// Wallet Payloads
// ============================================================================

export interface WalletDepositData {
  currency: 'btc'
  network: 'lightning' | 'bitcoin'
  id: string
  amount: number
  balance: number
  status: string
  txId: string
}

export interface WalletWithdrawData {
  currency: 'btc'
  network: 'lightning' | 'bitcoin'
  id: string
  amount: number
  fee: number
  balance: number
  status: string
  txId: string
}

// ============================================================================
// Announcement Events (structural union — no discriminator literal per D-58)
// ============================================================================

export interface AnnouncementAdd {
  id: string
  title: string
  message: string
  link: string | null
}

export interface AnnouncementRemove {
  id: string
}

export type AnnouncementEvent = AnnouncementAdd | AnnouncementRemove

// ============================================================================
// Subscription Data Map (Topic → payload)
// ============================================================================

export type SubscriptionData = {
  announcements: AnnouncementEvent
  'wallet/deposit': WalletDepositData
  'wallet/withdrawal': WalletWithdrawData
  'futures/inverse/btc_usd/ticker': FuturesTickerData
  'futures/inverse/btc_usd/lastPrice': FuturesLastPriceData
  'futures/inverse/btc_usd/index': FuturesIndexData
  'futures/inverse/btc_usd/buckets': FuturesBucketData
  'futures/inverse/btc_usd/funding': FuturesFundingData
  'futures/inverse/btc_usd/isolated/trades': IsolatedTradesEvent
  'futures/inverse/btc_usd/cross/orders': CrossOrderEvent
  'futures/inverse/btc_usd/cross/position': CrossPositionData
} & {
  [K in OhlcTopic]: OhlcData
}

// ============================================================================
// Lifecycle Event Types (D-53 — augmented with topic→payload index sig)
// ============================================================================

// Internal request/response correlation channel — instance.ts emits `response:${id}` frames; listener narrows via cast.
type JsonRpcResponseChannel = {
  [K in `response:${string}`]: [object]
}

export type StreamEvents = {
  open: []
  close: [code: number, reason: string]
  error: [Error]
  reconnected: [{ attempts: number }]
} & {
  [K in Topic]: [SubscriptionData[K]]
} & JsonRpcResponseChannel
