import type { RestFetcher } from '#src/rest.js'

import { createGetIndex } from './get-index.js'
import { createGetLastPrice } from './get-last-price.js'

export const createOracleRouter = (request: RestFetcher) => {
  return {
    getIndex: createGetIndex(request),
    getLastPrice: createGetLastPrice(request),
  }
}
