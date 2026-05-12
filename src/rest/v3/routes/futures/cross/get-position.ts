import type { KyInstance } from 'ky'
import type { FuturesCrossPosition } from '../../../types.js'

export type FuturesCrossGetPositionOutput = FuturesCrossPosition

type GetPosition = () => Promise<FuturesCrossGetPositionOutput>

export const createGetPosition = (instance: KyInstance): GetPosition => {
  return async () => {
    return instance.get('futures/cross/position').json()
  }
}
