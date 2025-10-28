import type { KyInstance } from 'ky'
import type { FuturesOpenOrRunningTrade } from '../../../types.js'

export type FuturesOrder = ({
  leverage: number
  side: 'b' | 's'
  stoploss?: number | undefined
  takeprofit?: number | undefined
} & (
  | {
      margin: number
      quantity?: undefined
    }
  | {
      margin?: undefined
      quantity: number
    }
)) &
  (
    | {
        price: number
        type: 'l'
      }
    | {
        price?: undefined
        type: 'm'
      }
  )

export type FuturesIsolatedNewTradeInput = FuturesOrder

export type FuturesIsolatedNewTradeOutput = FuturesOpenOrRunningTrade

type NewTrade = (
  input: FuturesIsolatedNewTradeInput
) => Promise<FuturesIsolatedNewTradeOutput>

export const createNewTrade = (instance: KyInstance): NewTrade => {
  return async ({
    leverage,
    margin,
    price,
    quantity,
    side,
    stoploss,
    takeprofit,
    type,
  }) => {
    return instance
      .post('futures/isolated/trade', {
        json: {
          leverage,
          margin,
          price,
          quantity,
          side,
          stoploss,
          takeprofit,
          type,
        },
      })
      .json()
  }
}
