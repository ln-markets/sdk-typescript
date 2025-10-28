import type { KyInstance } from 'ky'

import type { OptionsTrade } from './types.js'

export const createGetTrade = (instance: KyInstance) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/optionsgettrade
   */
  return async (params: { id: string }) =>
    instance.get(`options/trades/${params.id}`).json<OptionsTrade>()
}
