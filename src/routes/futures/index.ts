import type { RestFetcher } from '#src/rest.js'

import { createAddMargin } from './add-margin.js'
import { createCancelAllTrades } from './cancel-all-trades.js'
import { createCancelTrade } from './cancel-trade.js'
import { createCashIn } from './cash-in.js'
import { createCloseAllTrades } from './close-all-trades.js'
import { createCloseTrade } from './close-trade.js'
import { createGetCarryFeesHistory } from './get-carry-fees-history.js'
import { createGetFixingHistory } from './get-fixing-history.js'
import { createGetIndexHistory } from './get-index-history.js'
import { createGetLeaderboard } from './get-leaderboard.js'
import { createGetMarketDetails } from './get-market-details.js'
import { createGetOHLCHistory } from './get-ohlc-history.js'
import { createGetPriceHistory } from './get-price-history.js'
import { createGetTicker } from './get-ticker.js'
import { createGetTrade } from './get-trade.js'
import { createGetTrades } from './get-trades.js'
import { createNewTrade } from './new-trade.js'
import { createUpdateTrade } from './update-trade.js'

export const createFuturesRouter = (request: RestFetcher) => {
  return {
    addMargin: createAddMargin(request),
    cancelAllTrades: createCancelAllTrades(request),
    cancelTrade: createCancelTrade(request),
    cashIn: createCashIn(request),
    closeAllTrades: createCloseAllTrades(request),
    closeTrade: createCloseTrade(request),
    getCarryFeesHistory: createGetCarryFeesHistory(request),
    getFixingHistory: createGetFixingHistory(request),
    getIndexHistory: createGetIndexHistory(request),
    getLeaderboard: createGetLeaderboard(request),
    getMarketDetails: createGetMarketDetails(request),
    getOHLCHistory: createGetOHLCHistory(request),
    getPriceHistory: createGetPriceHistory(request),
    getTicker: createGetTicker(request),
    getTrade: createGetTrade(request),
    getTrades: createGetTrades(request),
    newTrade: createNewTrade(request),
    updateTrade: createUpdateTrade(request),
  }
}
