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

export type * from './add-margin.js'
export type * from './cancel-all.js'
export type * from './cancel.js'
export type * from './cash-in.js'
export type * from './close.js'
export type * from './get-closed-trades.js'
export type * from './get-funding-fees.js'
export type * from './get-open-trades.js'
export type * from './get-running-trades.js'
export type * from './new-trade.js'
export type * from './stoploss.js'
export type * from './takeprofit.js'

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
