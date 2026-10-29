import type { KyInstance } from 'ky'

import type { FuturesTradeSide } from '../../../types.js'
import type {
  PerpMarketKey,
  PerpOpenOrRunningTrade,
  PerpStoploss,
} from '../types.js'

export type PerpOrder = (PerpMarketKey & {
  leverage: number
  side: FuturesTradeSide
  stoploss?: PerpStoploss
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

export type PerpIsolatedNewTradeInput = PerpOrder

export type PerpIsolatedNewTradeOutput = PerpOpenOrRunningTrade

type NewTrade = (
  input: Readonly<PerpIsolatedNewTradeInput>
) => Promise<PerpIsolatedNewTradeOutput>

export const createNewTrade = (instance: Readonly<KyInstance>): NewTrade => {
  return async ({
    instrument,
    leverage,
    margin,
    pair,
    price,
    quantity,
    side,
    stoploss,
    takeprofit,
    type,
    clientId,
  }) => {
    return instance
      .post('perp/isolated/trade', {
        json: {
          instrument,
          leverage,
          margin,
          pair,
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
