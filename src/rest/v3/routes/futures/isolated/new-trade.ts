import type { KyInstance } from 'ky'

import type { FuturesOpenOrRunningTrade } from '../../../types.js'

export type FuturesOrder = ({
  leverage: number
  side: 'buy' | 'sell'
  stoploss?: number
  takeprofit?: number
  clientId?: string
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
        type: 'limit'
      }
    | {
        price?: undefined
        type: 'market'
      }
  )

export type FuturesIsolatedNewTradeInput = FuturesOrder

export type FuturesIsolatedNewTradeOutput = FuturesOpenOrRunningTrade

type NewTrade = (
  input: Readonly<FuturesIsolatedNewTradeInput>
) => Promise<FuturesIsolatedNewTradeOutput>

export const createNewTrade = (instance: Readonly<KyInstance>): NewTrade => {
  return async ({
    leverage,
    margin,
    price,
    quantity,
    side,
    stoploss,
    takeprofit,
    type,
    clientId,
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
          clientId,
        },
      })
      .json()
  }
}
