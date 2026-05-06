import type { KyInstance } from 'ky'

export interface GetLeaderboardOutput {
  'all-time': {
    direction: number
    pl: number
    username: string
  }[]
  daily: {
    direction: number
    pl: number
    username: string
  }[]
  monthly: {
    direction: number
    pl: number
    username: string
  }[]
  weekly: {
    direction: number
    pl: number
    username: string
  }[]
}

type GetLeaderboard = () => Promise<GetLeaderboardOutput>

export const createGetLeaderboard = (instance: KyInstance): GetLeaderboard => {
  return async () => {
    return instance.get('futures/leaderboard').json()
  }
}
