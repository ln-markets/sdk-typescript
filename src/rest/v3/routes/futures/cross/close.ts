import type { KyInstance } from 'ky'
import type { FuturesCrossOrder } from '../../../types.js'

export type FuturesCrossCloseOutput = FuturesCrossOrder

type Close = () => Promise<FuturesCrossCloseOutput>

export const createClose = (instance: KyInstance): Close => {
  return async () => {
    return instance.post('futures/cross/position/close').json()
  }
}
