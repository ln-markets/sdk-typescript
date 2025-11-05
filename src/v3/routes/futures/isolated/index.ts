import type { KyInstance } from 'ky'

import { createAddMargin } from './add-margin.js'
import { createCancelAll } from './cancel-all.js'
import { createCancel } from './cancel.js'
import { createCashIn } from './cash-in.js'
import { createClose } from './close.js'
import { createGetClosedTrades } from './get-closed-trades.js'
import { createGetFundingFees } from './get-funding-fees.js'
import { createGetOpenTrades } from './get-open-trades.js'
import { createGetRunningTrades } from './get-running-trades.js'
import { createNewTrade } from './new-trade.js'
import { createUpdateStoploss } from './stoploss.js'
import { createUpdateTakeprofit } from './takeprofit.js'

export type {
  FuturesIsolatedAddMarginInput,
  FuturesIsolatedAddMarginOutput,
} from './add-margin.js'
export type { FuturesIsolatedCancelAllOutput } from './cancel-all.js'
export type {
  FuturesIsolatedCancelTradeInput,
  FuturesIsolatedCancelOutput,
} from './cancel.js'
export type {
  FuturesIsolatedCashInInput,
  FuturesIsolatedCashInOutput,
} from './cash-in.js'
export type {
  FuturesIsolatedCloseTradeInput,
  FuturesIsolatedCloseOutput,
} from './close.js'
export type { FuturesIsolatedGetClosedTradesOutput } from './get-closed-trades.js'
export type {
  FuturesIsolatedGetFundingFeesInput,
  FuturesIsolatedGetFundingFeesOutput,
} from './get-funding-fees.js'
export type { FuturesIsolatedGetOpenTradesOutput } from './get-open-trades.js'
export type { FuturesIsolatedGetRunningTradesOutput } from './get-running-trades.js'
export type {
  FuturesIsolatedNewTradeInput,
  FuturesIsolatedNewTradeOutput,
} from './new-trade.js'
export type {
  FuturesIsolatedUpdateStoplossInput,
  FuturesIsolatedUpdateStoplossOutput,
} from './stoploss.js'
export type {
  FuturesIsolatedUpdateTakeprofitInput,
  FuturesIsolatedUpdateTakeprofitOutput,
} from './takeprofit.js'

export const createFuturesIsolatedRoute = (instance: KyInstance) => ({
  addMargin: createAddMargin(instance),
  cancel: createCancel(instance),
  cancelAll: createCancelAll(instance),
  cashIn: createCashIn(instance),
  close: createClose(instance),
  getClosedTrades: createGetClosedTrades(instance),
  getFundingFees: createGetFundingFees(instance),
  getOpenTrades: createGetOpenTrades(instance),
  getRunningTrades: createGetRunningTrades(instance),
  newTrade: createNewTrade(instance),
  updateStoploss: createUpdateStoploss(instance),
  updateTakeprofit: createUpdateTakeprofit(instance),
})
