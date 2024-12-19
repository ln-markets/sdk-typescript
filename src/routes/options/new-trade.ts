import snakecaseKeys from 'snakecase-keys'

import type { RestFetcher } from '../../rest.js'
import type {
  OptionsSettlement,
  OptionsSide,
  OptionsTradeRunning,
} from './index.js'

export const createNewTrade = (request: RestFetcher) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/optionsnewtrade
   */
  return async (body: {
    instrumentName: string
    quantity: number
    settlement: OptionsSettlement
    side: OptionsSide
  }) =>
    request({
      body: snakecaseKeys(body),
      method: 'POST',
      path: '/options',
      requireAuth: true,
    }) as Promise<OptionsTradeRunning>
}
