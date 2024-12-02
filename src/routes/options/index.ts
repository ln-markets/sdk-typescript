import type { RestFetcher } from '#src/rest.js'

import { createCloseAllTrades } from './close-all.js'
import { createCloseTrade } from './close.js'
import { createGetInstrument } from './get-instrument.js'
import { createGetInstruments } from './get-instruments.js'
import { createGetMarketDetails } from './get-market-details.js'
import { createGetTrade } from './get-trade.js'
import { createGetTrades } from './get-trades.js'
import { createGetVolatilityIndex } from './get-volatility-index.js'
import { createNewTrade } from './new-trade.js'
import { createUpdateTrade } from './update-trade.js'

export const createOptionsRouter = (request: RestFetcher) => {
  return {
    closeAllTrades: createCloseAllTrades(request),
    closeTrade: createCloseTrade(request),
    getInstrument: createGetInstrument(request),
    getInstruments: createGetInstruments(request),
    getMarketDetails: createGetMarketDetails(request),
    getTrade: createGetTrade(request),
    getTrades: createGetTrades(request),
    getVolatilityIndex: createGetVolatilityIndex(request),
    newTrade: createNewTrade(request),
    updateTrade: createUpdateTrade(request),
  }
}
