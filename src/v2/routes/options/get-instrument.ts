import type { KyInstance } from 'ky'

import type { OptionsInstrument } from './types.js'

export const createGetInstrument = (instance: KyInstance) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/optionsgetinstrument
   */
  return async (body: { instrumentName: string }) => {
    return instance
      .get('options/instrument', {
        searchParams: {
          instrument_name: body.instrumentName,
        },
      })
      .json<OptionsInstrument>()
  }
}
