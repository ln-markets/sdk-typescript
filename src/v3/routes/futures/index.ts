import type { KyInstance } from 'ky'

import { createGetCandles } from './candles.js'
import { createFuturesCrossRoute } from './cross/index.js'
import { createGetFuturesFundingSettlementsRoute } from './funding-settlements.js'
import { createFuturesIsolatedRoute } from './isolated/index.js'
import { createGetLeaderboard } from './leaderboard.js'
import { createGetTicker } from './ticker.js'

export type FuturesRoute = ReturnType<typeof createFuturesRoute>

export const createFuturesRoute = (instance: KyInstance) => ({
  cross: createFuturesCrossRoute(instance),
  getCandles: createGetCandles(instance),
  getFundingSettlements: createGetFuturesFundingSettlementsRoute(instance),
  getLeaderboard: createGetLeaderboard(instance),
  getTicket: createGetTicker(instance),
  isolated: createFuturesIsolatedRoute(instance),
})

export type * from './candles.js'
export type * from './funding-settlements.js'
export type * from './leaderboard.js'
export type * from './ticker.js'

export type {
  FuturesCrossCancelAllOutput,
  FuturesCrossCancelOrderInput,
  FuturesCrossCancelOutput,
  FuturesCrossCloseOutput,
  FuturesCrossDepositInput,
  FuturesCrossDepositOutput,
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
  FuturesIsolatedGetClosedTradesOutput,
  FuturesIsolatedGetFundingFeesInput,
  FuturesIsolatedGetFundingFeesOutput,
  FuturesIsolatedGetOpenTradesOutput,
  FuturesIsolatedGetRunningTradesOutput,
  FuturesIsolatedNewTradeInput,
  FuturesIsolatedNewTradeOutput,
  FuturesIsolatedUpdateStoplossInput,
  FuturesIsolatedUpdateStoplossOutput,
  FuturesIsolatedUpdateTakeprofitInput,
  FuturesIsolatedUpdateTakeprofitOutput,
  FuturesOrder,
} from './isolated/index.js'
