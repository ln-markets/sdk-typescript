import type { KyInstance } from 'ky'

import { createGetCandles } from './candles.js'
import { createFuturesCrossRoute } from './cross/index.js'
import { createGetFuturesFundingSettlementsRoute } from './funding-settlements.js'
import { createFuturesIsolatedRoute } from './isolated/index.js'
import { createGetLeaderboard } from './leaderboard.js'
import { createGetTicker } from './ticker.js'

export const createFuturesRoute = (instance: KyInstance) => ({
  cross: createFuturesCrossRoute(instance),
  getCandles: createGetCandles(instance),
  getFundingSettlements: createGetFuturesFundingSettlementsRoute(instance),
  getLeaderboard: createGetLeaderboard(instance),
  getTicket: createGetTicker(instance),
  isolated: createFuturesIsolatedRoute(instance),
})

export type { GetCandlesInput, GetCandlesOutput } from './candles.js'
export type {
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
} from './isolated/index.js'
