import type { KyInstance } from 'ky'
import type { FuturesCrossPosition } from '../../../types.js'

export interface FuturesCrossSetLeverageInput {
  leverage: number
}

export type FuturesCrossSetLeverageOutput = FuturesCrossPosition

type SetLeverage = (
  input: FuturesCrossSetLeverageInput
) => Promise<FuturesCrossSetLeverageOutput>

export const createSetLeverage = (instance: KyInstance): SetLeverage => {
  return async ({ leverage }) => {
    return instance.put('futures/cross/leverage', { json: { leverage } }).json()
  }
}
