import type { KyInstance } from 'ky'
import type { FuturesRunningTrade } from '../../../types.js'

export type FuturesIsolatedGetRunningTradesOutput = FuturesRunningTrade[]

type GetRunningTrades = () => Promise<FuturesIsolatedGetRunningTradesOutput>

export const createGetRunningTrades = (
  instance: KyInstance
): GetRunningTrades => {
  return async () => {
    return instance.get('futures/isolated/trades/running').json()
  }
}
