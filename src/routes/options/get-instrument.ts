import type { RestFetcher } from '#src/rest.js'

import type { OptionsInstrument } from './types.js'

export const createGetInstrument = (request: RestFetcher) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/optionsgetinstrument
   */
  return async (body: { instrumentName: string }) => {
    return request({
      body: {
        instrument_name: body.instrumentName,
      },
      method: 'GET',
      path: `/options/instrument`,
    }) as Promise<OptionsInstrument>
  }
}
