import type { KyInstance } from 'ky'

import { createAddMargin } from './add-margin.js'
import { createCancelAll } from './cancel-all.js'
import { createCancel } from './cancel.js'
import { createCashIn } from './cash-in.js'
import { createClose } from './close.js'
import { createGetCanceledTrades } from './get-canceled-trades.js'
import { createGetClosedTrades } from './get-closed-trades.js'
import { createGetFundingFees } from './get-funding-fees.js'
import { createGetOpenTrades } from './get-open-trades.js'
import { createGetRunningTrades } from './get-running-trades.js'
import { createNewTrade } from './new-trade.js'
import { createUpdateStoploss, createRemoveStoploss } from './stoploss.js'
import { createUpdateTakeprofit, createRemoveTakeprofit } from './takeprofit.js'

export type {
  PerpIsolatedAddMarginInput,
  PerpIsolatedAddMarginOutput,
} from './add-margin.js'
export type {
  PerpIsolatedCancelAllInput,
  PerpIsolatedCancelAllOutput,
} from './cancel-all.js'
export type {
  PerpIsolatedCancelOutput,
  PerpIsolatedCancelTradeInput,
} from './cancel.js'
export type {
  PerpIsolatedCashInInput,
  PerpIsolatedCashInOutput,
} from './cash-in.js'
export type {
  PerpIsolatedCloseOutput,
  PerpIsolatedCloseTradeInput,
} from './close.js'
export type {
  PerpIsolatedGetCanceledTradesInput,
  PerpIsolatedGetCanceledTradesOutput,
} from './get-canceled-trades.js'
export type {
  PerpIsolatedGetClosedTradesInput,
  PerpIsolatedGetClosedTradesOutput,
} from './get-closed-trades.js'
export type {
  PerpIsolatedGetFundingFeesInput,
  PerpIsolatedGetFundingFeesOutput,
} from './get-funding-fees.js'
export type {
  PerpIsolatedGetOpenTradesInput,
  PerpIsolatedGetOpenTradesOutput,
} from './get-open-trades.js'
export type {
  PerpIsolatedGetRunningTradesInput,
  PerpIsolatedGetRunningTradesOutput,
} from './get-running-trades.js'
export type {
  PerpIsolatedNewTradeInput,
  PerpIsolatedNewTradeOutput,
  PerpOrder,
} from './new-trade.js'
export type {
  PerpIsolatedRemoveStoplossInput,
  PerpIsolatedRemoveStoplossOutput,
  PerpIsolatedUpdateStoplossInput,
  PerpIsolatedUpdateStoplossOutput,
} from './stoploss.js'
export type {
  PerpIsolatedRemoveTakeprofitInput,
  PerpIsolatedRemoveTakeprofitOutput,
  PerpIsolatedUpdateTakeprofitInput,
  PerpIsolatedUpdateTakeprofitOutput,
} from './takeprofit.js'

export const createPerpIsolatedRoute = (instance: Readonly<KyInstance>) => ({
  addMargin: createAddMargin(instance),
  cancel: createCancel(instance),
  cancelAll: createCancelAll(instance),
  cashIn: createCashIn(instance),
  close: createClose(instance),
  getCanceledTrades: createGetCanceledTrades(instance),
  getClosedTrades: createGetClosedTrades(instance),
  getFundingFees: createGetFundingFees(instance),
  getOpenTrades: createGetOpenTrades(instance),
  getRunningTrades: createGetRunningTrades(instance),
  newTrade: createNewTrade(instance),
  removeStoploss: createRemoveStoploss(instance),
  removeTakeprofit: createRemoveTakeprofit(instance),
  updateStoploss: createUpdateStoploss(instance),
  updateTakeprofit: createUpdateTakeprofit(instance),
})
