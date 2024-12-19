import type { RestFetcher } from '../../rest.js'
import type { Leaderboard } from '../user/index.js'

export const createGetLeaderboard = (request: RestFetcher) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/futuresgetleaderboard
   */
  return async () =>
    request<Leaderboard>({
      method: 'GET',
      path: '/futures/leaderboard',
    })
}
