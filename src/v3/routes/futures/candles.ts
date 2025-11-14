import type { KyInstance } from 'ky'
import type { PaginatedResponse } from '../../types.js'

type CandlesResolution =
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
  cursor?: string
  from: string
  limit?: number
  range?: CandlesResolution
  to?: string
}

interface Candle {
  close: number
  high: number
  low: number
  open: number
  time: string
  volume: number
}

export type GetCandlesOutput = PaginatedResponse<Candle>

type GetCandles = (input: GetCandlesInput) => Promise<GetCandlesOutput>

export const createGetCandles = (instance: KyInstance): GetCandles => {
  return async ({ cursor, from, limit, range, to }) => {
    return instance
      .get('futures/candles', {
        searchParams: { cursor, from, limit, range, to },
      })
      .json()
  }
}
