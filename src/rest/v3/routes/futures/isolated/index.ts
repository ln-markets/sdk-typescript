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
import { createUpdateStoploss, createRemoveStoploss } from './stoploss.js'
import { createUpdateTakeprofit, createRemoveTakeprofit } from './takeprofit.js'

export type {
  FuturesIsolatedAddMarginInput,
  FuturesIsolatedAddMarginOutput,
} from './add-margin.js'
export type { FuturesIsolatedCancelAllOutput } from './cancel-all.js'
export type {
  FuturesIsolatedCancelOutput,
  FuturesIsolatedCancelTradeInput,
} from './cancel.js'
export type {
  FuturesIsolatedCashInInput,
  FuturesIsolatedCashInOutput,
} from './cash-in.js'
export type {
  FuturesIsolatedCloseOutput,
  FuturesIsolatedCloseTradeInput,
} from './close.js'
export type {
  FuturesIsolatedGetClosedTradesInput,
  FuturesIsolatedGetClosedTradesOutput,
} from './get-closed-trades.js'
export type {
  FuturesIsolatedGetFundingFeesInput,
  FuturesIsolatedGetFundingFeesOutput,
} from './get-funding-fees.js'
export type { FuturesIsolatedGetOpenTradesOutput } from './get-open-trades.js'
export type { FuturesIsolatedGetRunningTradesOutput } from './get-running-trades.js'
export type {
  FuturesIsolatedNewTradeInput,
  FuturesIsolatedNewTradeOutput,
  FuturesOrder as FuturesIsolatedOrder,
} from './new-trade.js'
export type {
  FuturesIsolatedRemoveStoplossInput,
  FuturesIsolatedUpdateStoplossInput,
  FuturesIsolatedRemoveStoplossOutput,
  FuturesIsolatedUpdateStoplossOutput,
} from './stoploss.js'
export type {
  FuturesIsolatedRemoveTakeprofitInput,
  FuturesIsolatedRemoveTakeprofitOutput,
  FuturesIsolatedUpdateTakeprofitInput,
  FuturesIsolatedUpdateTakeprofitOutput,
} from './takeprofit.js'

// Every method maps to the same `perp.isolated` method on the BTC/USD market:
// `{ instrument: 'inverse_perp', pair: 'btc_usd' }`.
export const createFuturesIsolatedRoute = (instance: Readonly<KyInstance>) => ({
  /** @deprecated Use `perp.isolated.addMargin({ instrument: 'inverse_perp', pair: 'btc_usd', ... })` (`POST /v3/perp/isolated/trade/add-margin`). */
  addMargin: createAddMargin(instance),
  /** @deprecated Use `perp.isolated.cancel({ instrument: 'inverse_perp', pair: 'btc_usd', ... })` (`POST /v3/perp/isolated/trade/cancel`). */
  cancel: createCancel(instance),
  /** @deprecated Use `perp.isolated.cancelAll({ instrument: 'inverse_perp', pair: 'btc_usd' })` (`POST /v3/perp/isolated/trades/cancel-all`). */
  cancelAll: createCancelAll(instance),
  /** @deprecated Use `perp.isolated.cashIn({ instrument: 'inverse_perp', pair: 'btc_usd', ... })` (`POST /v3/perp/isolated/trade/cash-in`). */
  cashIn: createCashIn(instance),
  /** @deprecated Use `perp.isolated.close({ instrument: 'inverse_perp', pair: 'btc_usd', ... })` (`POST /v3/perp/isolated/trade/close`). */
  close: createClose(instance),
  /** @deprecated Use `perp.isolated.getClosedTrades` and `perp.isolated.getCanceledTrades` with `{ instrument: 'inverse_perp', pair: 'btc_usd' }` (`GET /v3/perp/isolated/trades/closed`, `GET /v3/perp/isolated/trades/canceled`). */
  getClosedTrades: createGetClosedTrades(instance),
  /** @deprecated Use `perp.isolated.getFundingFees({ instrument: 'inverse_perp', pair: 'btc_usd', ... })` (`GET /v3/perp/isolated/funding-fees`). */
  getFundingFees: createGetFundingFees(instance),
  /** @deprecated Use `perp.isolated.getOpenTrades({ instrument: 'inverse_perp', pair: 'btc_usd' })` (`GET /v3/perp/isolated/trades/open`). */
  getOpenTrades: createGetOpenTrades(instance),
  /** @deprecated Use `perp.isolated.getRunningTrades({ instrument: 'inverse_perp', pair: 'btc_usd' })` (`GET /v3/perp/isolated/trades/running`). */
  getRunningTrades: createGetRunningTrades(instance),
  /** @deprecated Use `perp.isolated.newTrade({ instrument: 'inverse_perp', pair: 'btc_usd', ... })` (`POST /v3/perp/isolated/trade`). */
  newTrade: createNewTrade(instance),
  /** @deprecated Use `perp.isolated.removeStoploss({ instrument: 'inverse_perp', pair: 'btc_usd', ... })` (`DELETE /v3/perp/isolated/trade/stoploss`). */
  removeStoploss: createRemoveStoploss(instance),
  /** @deprecated Use `perp.isolated.removeTakeprofit({ instrument: 'inverse_perp', pair: 'btc_usd', ... })` (`DELETE /v3/perp/isolated/trade/takeprofit`). */
  removeTakeprofit: createRemoveTakeprofit(instance),
  /** @deprecated Use `perp.isolated.updateStoploss({ instrument: 'inverse_perp', pair: 'btc_usd', ... })` (`PUT /v3/perp/isolated/trade/stoploss`). */
  updateStoploss: createUpdateStoploss(instance),
  /** @deprecated Use `perp.isolated.updateTakeprofit({ instrument: 'inverse_perp', pair: 'btc_usd', ... })` (`PUT /v3/perp/isolated/trade/takeprofit`). */
  updateTakeprofit: createUpdateTakeprofit(instance),
})
