import type { KyInstance } from 'ky'

import type { OptionsMarketDetails } from './types.js'

export const createGetMarketDetails = (instance: KyInstance) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/optionsgetoptionsmarket
   */
  return async () => instance.get('options').json<OptionsMarketDetails>()
}
