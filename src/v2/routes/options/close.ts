import type { KyInstance } from 'ky'

import type { OptionsTradeClosed } from './types.js'

export const createCloseTrade = (instance: KyInstance) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/optionsclosetrade
   */
  return async (searchParams: { id: string }) => {
    return instance
      .delete('options', { searchParams })
      .json<OptionsTradeClosed>()
  }
}
