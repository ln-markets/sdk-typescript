import type { KyInstance } from 'ky'

import type { FuturesCanceledTrade } from './types.js'

export const createCancelTrade = (instance: KyInstance) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/futurescanceltrade
   */
  return async (body: { id: string }) =>
    instance
      .post('futures/cancel', {
        json: body,
      })
      .json<FuturesCanceledTrade>()
}
