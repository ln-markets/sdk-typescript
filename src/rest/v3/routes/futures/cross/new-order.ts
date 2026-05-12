import type { KyInstance } from 'ky'
import type { FuturesCrossOrder } from '../../../types.js'

export type FuturesCrossNewOrderInput = {
  quantity: number
  side: 'buy' | 'sell'
} & (
  | {
      price: number
      type: 'limit'
    }
  | {
      price?: undefined
      type: 'market'
    }
)

export type FuturesCrossNewOrderOutput = FuturesCrossOrder

type NewOrder = (
  input: FuturesCrossNewOrderInput
) => Promise<FuturesCrossNewOrderOutput>

export const createNewOrder = (instance: KyInstance): NewOrder => {
  return async (params) => {
    return instance.post('futures/cross/order', { json: { ...params } }).json()
  }
}
