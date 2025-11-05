import type { KyInstance } from 'ky'

import snakecaseKeys from 'snakecase-keys'

import type {
  OptionsSettlement,
  OptionsSide,
  OptionsTradeRunning,
} from './types.js'

export const createNewTrade = (instance: KyInstance) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/optionsnewtrade
   */
  return async (body: {
    instrumentName: string
    quantity: number
    settlement: OptionsSettlement
    side: OptionsSide
  }) =>
    instance
      .post('options', {
        json: snakecaseKeys(body),
      })
      .json<OptionsTradeRunning>()
}
