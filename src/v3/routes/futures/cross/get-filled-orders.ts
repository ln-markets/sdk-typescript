import type { KyInstance } from 'ky'
import type { PaginatedResponse, PaginationInput } from '../../../types.js'

export type FuturesCrossGetFilledOrdersInput = PaginationInput

interface FilledOrder {
  canceled: false
  canceledAt: null
  createdAt: string
  filled: true
  filledAt: string
  id: string
  open: false
  price: number
  quantity: number
  side: 'buy' | 'sell'
  tradingFee: number
  type: 'limit' | 'liquidation' | 'market'
  uid: string
}

export type FuturesCrossGetFilledOrdersOutput = PaginatedResponse<FilledOrder>

type GetFilledOrders = (
  input?: FuturesCrossGetFilledOrdersInput
) => Promise<FuturesCrossGetFilledOrdersOutput>

export const createGetFilledOrders = (
  instance: KyInstance
): GetFilledOrders => {
  return async ({ cursor, from, limit, to } = {}) => {
    return instance
      .get('futures/cross/orders/filled', {
        searchParams: { cursor, from, limit, to },
      })
      .json()
  }
}
