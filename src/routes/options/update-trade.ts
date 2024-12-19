import type { UUID } from '../../index.js'
import type { RestFetcher } from '../../rest.js'
import type { OptionsSettlement } from './index.js'
import type { OptionsTradeRunningWithDelta } from './index.js'

export const createUpdateTrade = (request: RestFetcher) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/optionsupdatetrade
   */
  return async (body: { id: UUID; settlement: OptionsSettlement }) =>
    request<OptionsTradeRunningWithDelta>({
      body,
      method: 'PUT',
      path: '/options',
    })
}
