import type { RestFetcher } from '../../rest.js'
import type { OptionsInstrument } from './types.js'

export const createGetInstrument = (request: RestFetcher) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/optionsgetinstrument
   */
  return async (body: { instrumentName: string }) => {
    return request<OptionsInstrument>({
      body: {
        instrument_name: body.instrumentName,
      },
      method: 'GET',
      path: `/options/instrument`,
    })
  }
}
