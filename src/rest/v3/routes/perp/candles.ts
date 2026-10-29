import type { KyInstance } from 'ky'

import type { Candle, CandlesResolution } from '../futures/candles.js'

import type { PerpMarketKey } from './types.js'

// Candles have no id: a candle is unique by its time.
export interface PerpCandlesCursor {
  readonly value: string
}

export interface PerpGetCandlesInput extends PerpMarketKey {
  cursor?: PerpCandlesCursor
  from?: string
  limit?: number
  range?: CandlesResolution
  to?: string
}

export interface PerpGetCandlesOutput extends PerpMarketKey {
  data: Candle[]
  nextCursor: PerpCandlesCursor | null
}

type GetCandles = (
  input: Readonly<PerpGetCandlesInput>
) => Promise<PerpGetCandlesOutput>

export const createGetCandles = (
  instance: Readonly<KyInstance>
): GetCandles => {
  return async ({ cursor, from, instrument, limit, pair, range, to }) => {
    return instance
      .get('perp/candles', {
        searchParams: {
          'cursor[value]': cursor?.value,
          from,
          instrument,
          limit,
          pair,
          range,
          to,
        },
      })
      .json()
  }
}
