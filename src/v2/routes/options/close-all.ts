import type { RestFetcher } from '../../rest.js'
import type { OptionsTradeClosed } from './types.js'

export const createCloseAllTrades = (request: RestFetcher) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/optionsclosealltrades
   */
  return async () => {
    return request<OptionsTradeClosed[]>({
      method: 'DELETE',
      path: '/options/all/close',
      requireAuth: true,
    })
  }
}
