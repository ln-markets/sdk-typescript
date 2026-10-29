import type {
  FuturesStoplossMode,
  FuturesTradeSide,
  FuturesTradeType,
} from '../../types.js'

// ============================================================================
// Perp Types (Shared across multiple perp routes)
// ============================================================================

export type PerpInstrument = 'inverse_perp' | 'quanto_perp'

/** Names one perp market, e.g. `{ instrument: 'quanto_perp', pair: 'xau_usdt' }`. */
export interface PerpMarketKey {
  instrument: PerpInstrument
  pair: string
}

/** Pass both keys to read one market, or neither to read every perp market. */
export type PerpMarketFilter =
  | PerpMarketKey
  | { instrument?: undefined; pair?: undefined }

/** Pass the `nextCursor` of the previous page as is. */
export interface PerpCursor {
  readonly id: string
  readonly value: string
}

export interface PerpPaginationInput {
  cursor?: PerpCursor
  from?: string
  limit?: number
  to?: string
}

export interface PerpPaginatedResponse<T> {
  data: T[]
  nextCursor: PerpCursor | null
}

export interface PerpStoploss {
  readonly mode: FuturesStoplossMode
  readonly value: number
}

export interface PerpTrade extends PerpMarketKey {
  canceled: boolean
  closed: boolean
  closedAt: string | null
  closingFee: number
  createdAt: string
  entryBtcPrice: number
  entryMargin: number
  entryNotionalUsd: number
  entryPrice: number
  exitNotionalUsd: number | null
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
  stoplossTrailingDistance: number
  sumCashInMargin: number
  sumCashInPl: number
  sumFundingFees: number
  sumQuantoAdjustmentFees: number
  takeprofit: number
  type: FuturesTradeType
  clientId: string | null
}

export type PerpCanceledTrade = PerpTrade & {
  canceled: true
  closed: false
  closedAt: string
  filledAt: null
  running: false
  type: 'limit'
}

export type PerpClosedTrade = PerpTrade & {
  canceled: false
  closed: true
  closedAt: string
  exitNotionalUsd: number
  exitPrice: number
  filledAt: string
  running: false
}

export type PerpOpenOrRunningTrade = PerpOpenTrade | PerpRunningTrade

export type PerpOpenTrade = PerpTrade & {
  canceled: false
  closed: false
  closedAt: null
  filledAt: null
  running: false
  type: 'limit'
}

export type PerpRunningTrade = PerpTrade & {
  canceled: false
  closed: false
  closedAt: null
  filledAt: string
  running: true
}

export interface PerpFundingFees extends PerpMarketKey {
  fee: number
  quantoAdjustmentFee: number
  settlementId: string
  time: string
  tradeId: string
}
