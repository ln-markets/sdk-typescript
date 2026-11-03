import type { KyInstance } from 'ky'

import { createGetCandles } from './candles.js'
import { createFuturesCrossRoute } from './cross/index.js'
import { createGetFuturesFundingSettlementsRoute } from './funding-settlements.js'
import { createFuturesIsolatedRoute } from './isolated/index.js'
import { createGetLeaderboard } from './leaderboard.js'
import { createGetTicker } from './ticker.js'

// Named so the emitted declarations reference it and keep the @deprecated tags.
export interface FuturesRoute {
  cross: ReturnType<typeof createFuturesCrossRoute>
  /** @deprecated Use `perp.getCandles({ instrument: 'inverse_perp', pair: 'btc_usd', ... })` (`GET /v3/perp/candles`). */
  getCandles: ReturnType<typeof createGetCandles>
  /** @deprecated Use `perp.getFundingSettlements({ instrument: 'inverse_perp', pair: 'btc_usd', ... })` (`GET /v3/perp/funding-settlements`). */
  getFundingSettlements: ReturnType<
    typeof createGetFuturesFundingSettlementsRoute
  >
  getLeaderboard: ReturnType<typeof createGetLeaderboard>
  /** @deprecated Use `perp.getTicker({ instrument: 'inverse_perp', pair: 'btc_usd' })` (`GET /v3/perp/ticker`). */
  getTicker: ReturnType<typeof createGetTicker>
  isolated: ReturnType<typeof createFuturesIsolatedRoute>
}

export const createFuturesRoute = (
  instance: Readonly<KyInstance>
): FuturesRoute => {
  return {
    cross: createFuturesCrossRoute(instance),
    // oxlint-disable-next-line typescript/no-deprecated -- defines the deprecated route
    getCandles: createGetCandles(instance),
    // oxlint-disable-next-line typescript/no-deprecated -- defines the deprecated route
    getFundingSettlements: createGetFuturesFundingSettlementsRoute(instance),
    getLeaderboard: createGetLeaderboard(instance),
    // oxlint-disable-next-line typescript/no-deprecated -- defines the deprecated route
    getTicker: createGetTicker(instance),
    isolated: createFuturesIsolatedRoute(instance),
  }
}

export type {
  Candle,
  CandlesResolution,
  GetCandlesInput,
  GetCandlesOutput,
} from './candles.js'
export type {
  FundingSettlement,
  GetFundingSettlementsInput,
  GetFundingSettlementsOutput,
} from './funding-settlements.js'
export type { GetLeaderboardOutput } from './leaderboard.js'
export type { GetTickerOutput } from './ticker.js'

export type {
  FuturesCrossCancelAllOutput,
  FuturesCrossCancelOrderInput,
  FuturesCrossCancelOutput,
  FuturesCrossCloseOutput,
  FuturesCrossDepositInput,
  FuturesCrossDepositOutput,
  FuturesCrossFilledOrder,
  FuturesCrossGetFilledOrdersInput,
  FuturesCrossGetFilledOrdersOutput,
  FuturesCrossGetFundingFeesInput,
  FuturesCrossGetFundingFeesOutput,
  FuturesCrossGetOpenOrdersOutput,
  FuturesCrossGetPositionOutput,
  FuturesCrossGetTransfersInput,
  FuturesCrossGetTransfersOutput,
  FuturesCrossNewOrderInput,
  FuturesCrossNewOrderOutput,
  FuturesCrossSetLeverageInput,
  FuturesCrossSetLeverageOutput,
  FuturesCrossTransfer,
  FuturesCrossWithdrawInput,
  FuturesCrossWithdrawOutput,
} from './cross/index.js'

export type {
  FuturesIsolatedAddMarginInput,
  FuturesIsolatedAddMarginOutput,
  FuturesIsolatedCancelAllOutput,
  FuturesIsolatedCancelOutput,
  FuturesIsolatedCancelTradeInput,
  FuturesIsolatedCashInInput,
  FuturesIsolatedCashInOutput,
  FuturesIsolatedCloseOutput,
  FuturesIsolatedCloseTradeInput,
  FuturesIsolatedGetClosedTradesInput,
  FuturesIsolatedGetClosedTradesOutput,
  FuturesIsolatedGetFundingFeesInput,
  FuturesIsolatedGetFundingFeesOutput,
  FuturesIsolatedGetOpenTradesOutput,
  FuturesIsolatedGetRunningTradesOutput,
  FuturesIsolatedNewTradeInput,
  FuturesIsolatedNewTradeOutput,
  FuturesIsolatedOrder,
  FuturesIsolatedRemoveStoplossInput,
  FuturesIsolatedRemoveStoplossOutput,
  FuturesIsolatedRemoveTakeprofitInput,
  FuturesIsolatedRemoveTakeprofitOutput,
  FuturesIsolatedUpdateStoplossInput,
  FuturesIsolatedUpdateStoplossOutput,
  FuturesIsolatedUpdateTakeprofitInput,
  FuturesIsolatedUpdateTakeprofitOutput,
} from './isolated/index.js'
