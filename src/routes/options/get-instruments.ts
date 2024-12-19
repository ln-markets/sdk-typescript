import type { RestFetcher } from '../../rest.js'

export const createGetInstruments = (request: RestFetcher) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/optionsgetinstruments
   */
  return async () =>
    request<{
      instruments: string[]
    }>({
      method: 'GET',
      path: '/options/instruments',
    })
}
