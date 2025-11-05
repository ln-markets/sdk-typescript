import type { KyInstance } from 'ky'

import type { OptionsVolatilityIndex } from './types.js'

export const createGetVolatilityIndex = (instance: KyInstance) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/optionsgetvolatilityindex
   */
  return async () =>
    instance.get('options/volatility-index').json<OptionsVolatilityIndex>()
}
