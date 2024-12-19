import type { RestFetcher } from '../../rest.js'

export const createGetInstruments = (request: RestFetcher) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/optionsgetinstruments
   */
  return async () =>
    request({
      method: 'GET',
      path: '/options/instruments',
    }) as Promise<{
      instruments: string[]
    }>
}
