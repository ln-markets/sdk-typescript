import type { KyInstance } from 'ky'

import type { Swap } from './types.js'

export const createGetSwaps = (instance: KyInstance) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/swapsgetswaps
   */
  return async (searchParams?: {
    from?: number
    limit?: number
    to?: number
  }) => instance.get('swap', { searchParams }).json<Swap[]>()
}
