import type { KyInstance } from 'ky'
import type { PaginationInput } from '../../../types.js'

export type FuturesCrossGetFilledOrdersInput = PaginationInput

export type FuturesCrossGetFilledOrdersOutput = {
  canceled: false
  canceledAt: null
  createdAt: Date
  filled: true
  filledAt: Date
  id: string
  open: false
  price: number
  quantity: number
  side: 'b' | 's'
  tradingFee: number
  type: 'limit' | 'liquidation' | 'market'
  uid: string
}[]

type GetFilledOrders = (
  input?: FuturesCrossGetFilledOrdersInput
) => Promise<FuturesCrossGetFilledOrdersOutput>

export const createGetFilledOrders = (
  instance: KyInstance
): GetFilledOrders => {
  return async (input) => {
    return instance
      .get('futures/cross/orders/filled', { json: { ...input } })
      .json()
  }
}
