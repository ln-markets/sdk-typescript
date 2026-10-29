import type { KyInstance } from 'ky'

import { createGetCandles } from './candles.js'
import { createGetFundingSettlements } from './funding-settlements.js'
import { createPerpIsolatedRoute } from './isolated/index.js'
import { createGetTicker } from './ticker.js'

export const createPerpRoute = (instance: Readonly<KyInstance>) => {
  return {
    getCandles: createGetCandles(instance),
    getFundingSettlements: createGetFundingSettlements(instance),
    getTicker: createGetTicker(instance),
    isolated: createPerpIsolatedRoute(instance),
  }
}

export type {
  PerpCandlesCursor,
  PerpGetCandlesInput,
  PerpGetCandlesOutput,
} from './candles.js'
export type {
  PerpFundingSettlement,
  PerpGetFundingSettlementsInput,
  PerpGetFundingSettlementsOutput,
} from './funding-settlements.js'
export type { PerpGetTickerInput, PerpGetTickerOutput } from './ticker.js'

export type {
  PerpIsolatedAddMarginInput,
  PerpIsolatedAddMarginOutput,
  PerpIsolatedCancelAllInput,
  PerpIsolatedCancelAllOutput,
  PerpIsolatedCancelOutput,
  PerpIsolatedCancelTradeInput,
  PerpIsolatedCashInInput,
  PerpIsolatedCashInOutput,
  PerpIsolatedCloseOutput,
  PerpIsolatedCloseTradeInput,
  PerpIsolatedGetCanceledTradesInput,
  PerpIsolatedGetCanceledTradesOutput,
  PerpIsolatedGetClosedTradesInput,
  PerpIsolatedGetClosedTradesOutput,
  PerpIsolatedGetFundingFeesInput,
  PerpIsolatedGetFundingFeesOutput,
  PerpIsolatedGetOpenTradesInput,
  PerpIsolatedGetOpenTradesOutput,
  PerpIsolatedGetRunningTradesInput,
  PerpIsolatedGetRunningTradesOutput,
  PerpIsolatedNewTradeInput,
  PerpIsolatedNewTradeOutput,
  PerpIsolatedRemoveStoplossInput,
  PerpIsolatedRemoveStoplossOutput,
  PerpIsolatedRemoveTakeprofitInput,
  PerpIsolatedRemoveTakeprofitOutput,
  PerpIsolatedUpdateStoplossInput,
  PerpIsolatedUpdateStoplossOutput,
  PerpIsolatedUpdateTakeprofitInput,
  PerpIsolatedUpdateTakeprofitOutput,
  PerpOrder,
} from './isolated/index.js'
