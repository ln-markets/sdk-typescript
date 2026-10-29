import type { KyInstance } from 'ky'

import type { PerpCanceledTrade, PerpMarketKey } from '../types.js'

export interface PerpIsolatedCancelTradeInput extends PerpMarketKey {
  id: string
}

export type PerpIsolatedCancelOutput = PerpCanceledTrade

type Cancel = (
  input: Readonly<PerpIsolatedCancelTradeInput>
) => Promise<PerpIsolatedCancelOutput>

export const createCancel = (instance: Readonly<KyInstance>): Cancel => {
  return async ({ id, instrument, pair }) => {
    return instance
      .post('perp/isolated/trade/cancel', { json: { id, instrument, pair } })
      .json()
  }
}
