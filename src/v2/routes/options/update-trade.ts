import type { KyInstance } from 'ky'

import type {
  OptionsSettlement,
  OptionsTradeRunningWithDelta,
} from './types.js'

export const createUpdateTrade = (instance: KyInstance) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/optionsupdatetrade
   */
  return async (body: { id: string; settlement: OptionsSettlement }) =>
    instance
      .put('options', {
        json: body,
      })
      .json<OptionsTradeRunningWithDelta>()
}
