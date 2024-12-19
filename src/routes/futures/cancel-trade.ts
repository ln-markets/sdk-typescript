import type { UUID } from '../../index.js'
import type { RestFetcher } from '../../rest.js'
import type { FuturesCanceledTrade } from './index.js'

export const createCancelTrade = (request: RestFetcher) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/futurescanceltrade
   */
  return async (body: { id: UUID }) =>
    request<FuturesCanceledTrade>({
      body,
      method: 'POST',
      path: `/futures/cancel`,
      requireAuth: true,
    })
}
