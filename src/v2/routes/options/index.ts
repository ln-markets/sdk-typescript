import type { KyInstance } from 'ky'

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

export const createOptionsRouter = (instance: KyInstance) => {
  return {
    closeAllTrades: createCloseAllTrades(instance),
    closeTrade: createCloseTrade(instance),
    getInstrument: createGetInstrument(instance),
    getInstruments: createGetInstruments(instance),
    getMarketDetails: createGetMarketDetails(instance),
    getTrade: createGetTrade(instance),
    getTrades: createGetTrades(instance),
    getVolatilityIndex: createGetVolatilityIndex(instance),
    newTrade: createNewTrade(instance),
    updateTrade: createUpdateTrade(instance),
  }
}
