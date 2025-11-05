import type { KyInstance } from 'ky'
import type { FuturesOpenTrade } from '../../../types.js'

export type FuturesIsolatedGetOpenTradesOutput = FuturesOpenTrade[]

type GetOpenTrades = () => Promise<FuturesIsolatedGetOpenTradesOutput>

export const createGetOpenTrades = (instance: KyInstance): GetOpenTrades => {
  return async () => {
    return instance.get('futures/isolated/trades/open').json()
  }
}
