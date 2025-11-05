import type { KyInstance } from 'ky'

import type { OptionsTradeClosed } from './types.js'

export const createCloseAllTrades = (instance: KyInstance) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/optionsclosealltrades
   */
  return async () => {
    return instance.delete('options/all/close').json<OptionsTradeClosed[]>()
  }
}
