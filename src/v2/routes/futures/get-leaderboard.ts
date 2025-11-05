import type { KyInstance } from 'ky'

import type { Leaderboard } from '../user/types.js'

export const createGetLeaderboard = (instance: KyInstance) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/futuresgetleaderboard
   */
  return async () => instance.get('futures/leaderboard').json<Leaderboard>()
}
