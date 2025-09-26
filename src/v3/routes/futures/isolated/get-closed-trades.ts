import type { KyInstance } from 'ky'
import type {
  FuturesCanceledTrade,
  FuturesClosedTrade,
} from '../../../types.js'

export type FuturesIsolatedGetClosedTradesOutput = (
  | FuturesCanceledTrade
  | FuturesClosedTrade
)[]

type GetClosedTrades = () => Promise<FuturesIsolatedGetClosedTradesOutput>

export const createGetClosedTrades = (
  instance: KyInstance
): GetClosedTrades => {
  return async () => {
    return instance.get('futures/isolated/trades/closed').json()
  }
}
