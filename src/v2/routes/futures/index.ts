import type { KyInstance } from 'ky'

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

export const createFuturesRouter = (instance: KyInstance) => {
  return {
    addMargin: createAddMargin(instance),
    cancelAllTrades: createCancelAllTrades(instance),
    cancelTrade: createCancelTrade(instance),
    cashIn: createCashIn(instance),
    closeAllTrades: createCloseAllTrades(instance),
    closeTrade: createCloseTrade(instance),
    getCarryFeesHistory: createGetCarryFeesHistory(instance),
    getFixingHistory: createGetFixingHistory(instance),
    getIndexHistory: createGetIndexHistory(instance),
    getLeaderboard: createGetLeaderboard(instance),
    getMarketDetails: createGetMarketDetails(instance),
    getOHLCHistory: createGetOHLCHistory(instance),
    getPriceHistory: createGetPriceHistory(instance),
    getTicker: createGetTicker(instance),
    getTrade: createGetTrade(instance),
    getTrades: createGetTrades(instance),
    newTrade: createNewTrade(instance),
    updateTrade: createUpdateTrade(instance),
  }
}
