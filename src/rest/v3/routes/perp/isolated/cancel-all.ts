import type { KyInstance } from 'ky'

import type { PerpCanceledTrade, PerpMarketKey } from '../types.js'

export type PerpIsolatedCancelAllInput = PerpMarketKey

export type PerpIsolatedCancelAllOutput = PerpCanceledTrade[]

type CancelAll = (
  input: Readonly<PerpIsolatedCancelAllInput>
) => Promise<PerpIsolatedCancelAllOutput>

export const createCancelAll = (instance: Readonly<KyInstance>): CancelAll => {
  return async ({ instrument, pair }) => {
    return instance
      .post('perp/isolated/trades/cancel-all', { json: { instrument, pair } })
      .json()
  }
}
