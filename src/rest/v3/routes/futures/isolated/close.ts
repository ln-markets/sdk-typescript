import type { KyInstance } from 'ky'

import type { FuturesClosedTrade } from '../../../types.js'

export interface FuturesIsolatedCloseTradeInput {
  id: string
}

export type FuturesIsolatedCloseOutput = FuturesClosedTrade

type Close = (
  input: Readonly<FuturesIsolatedCloseTradeInput>
) => Promise<FuturesIsolatedCloseOutput>

export const createClose = (instance: Readonly<KyInstance>): Close => {
  return async ({ id }) => {
    return instance
      .post('futures/isolated/trade/close', { json: { id } })
      .json()
  }
}
