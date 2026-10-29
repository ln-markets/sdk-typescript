import type { KyInstance } from 'ky'

import type { PerpClosedTrade, PerpMarketKey } from '../types.js'

export interface PerpIsolatedCloseTradeInput extends PerpMarketKey {
  id: string
}

export type PerpIsolatedCloseOutput = PerpClosedTrade

type Close = (
  input: Readonly<PerpIsolatedCloseTradeInput>
) => Promise<PerpIsolatedCloseOutput>

export const createClose = (instance: Readonly<KyInstance>): Close => {
  return async ({ id, instrument, pair }) => {
    return instance
      .post('perp/isolated/trade/close', { json: { id, instrument, pair } })
      .json()
  }
}
