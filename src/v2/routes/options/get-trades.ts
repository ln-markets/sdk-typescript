import type { KyInstance } from 'ky'

import type { OptionsTrade, OptionsTradeStatus } from './types.js'

export const createGetTrades = (instance: KyInstance) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/optionsgettrades
   */
  return async (searchParams?: {
    from: number
    limit?: number
    status: OptionsTradeStatus
    to: number
  }) => instance.get('options/trades', { searchParams }).json<OptionsTrade[]>()
}
