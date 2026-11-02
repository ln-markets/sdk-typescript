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
  /**
   * Your client order ID (max 64 characters). Unique across all your isolated
   * trades and markets: reusing one fails with HTTP 409 `CONFLICT` and places
   * no trade. Fetch the trade with `perp.isolated.getTrade({ clientId })`.
   */
  clientId?: string
  /** Free tag that several trades can share, e.g. a strategy (1 to 64 characters). */
  label?: string
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
    label,
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
          label,
        },
      })
      .json()
  }
}
