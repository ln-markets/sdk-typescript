import type { RestFetcher } from '#src/rest.js'
import type { UUID } from '#src/types.js'

import type { OptionsSettlement } from './types.js'
import type { OptionsTradeRunningWithDelta } from './types.js'

export const createUpdateTrade = (request: RestFetcher) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/optionsupdatetrade
   */
  return async (body: { id: UUID; settlement: OptionsSettlement }) =>
    request({
      body,
      method: 'PUT',
      path: '/options',
    }) as Promise<OptionsTradeRunningWithDelta>
}
