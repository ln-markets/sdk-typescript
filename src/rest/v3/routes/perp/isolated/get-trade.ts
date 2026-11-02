import type { KyInstance } from 'ky'

import type {
  PerpCanceledTrade,
  PerpClosedTrade,
  PerpOpenTrade,
  PerpRunningTradeRead,
} from '../types.js'

/** Pass exactly one of `id` or `clientId`. */
export type PerpIsolatedGetTradeInput =
  | { clientId: string; id?: undefined }
  | { clientId?: undefined; id: string }

/** The trade in its current state. Narrow it with `open`, `running`, `closed` or `canceled`. */
export type PerpIsolatedGetTradeOutput =
  | PerpCanceledTrade
  | PerpClosedTrade
  | PerpOpenTrade
  | PerpRunningTradeRead

type GetTrade = (
  input: Readonly<PerpIsolatedGetTradeInput>
) => Promise<PerpIsolatedGetTradeOutput>

export const createGetTrade = (instance: Readonly<KyInstance>): GetTrade => {
  return async ({ clientId, id }) => {
    return instance
      .get('perp/isolated/trade', { searchParams: { clientId, id } })
      .json()
  }
}
