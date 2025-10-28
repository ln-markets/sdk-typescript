import type { KyInstance } from 'ky'

export type CandlesResolution =
  | '1d'
  | '1h'
  | '1m'
  | '1month'
  | '1w'
  | '2h'
  | '3h'
  | '3m'
  | '3months'
  | '4h'
  | '5m'
  | '10m'
  | '15m'
  | '30m'
  | '45m'

export interface GetCandlesInput {
  from: string
  limit?: number
  range?: CandlesResolution
  to?: string
}

export type GetCandlesOutput = {
  close: number
  high: number
  low: number
  open: number
  time: Date
  volume: number
}[]

type GetCandles = (input: GetCandlesInput) => Promise<GetCandlesOutput>

export const createGetCandles = (instance: KyInstance): GetCandles => {
  return async ({ from, limit = 100, range = '1m', to }) => {
    return instance
      .get('futures/candles', { searchParams: { from, limit, range, to } })
      .json()
  }
}
