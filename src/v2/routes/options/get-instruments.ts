import type { KyInstance } from 'ky'

export const createGetInstruments = (instance: KyInstance) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/optionsgetinstruments
   */
  return async () =>
    instance.get('options/instruments').json<{
      instruments: string[]
    }>()
}
