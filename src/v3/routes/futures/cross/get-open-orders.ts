import type { KyInstance } from 'ky'

export type FuturesCrossGetOpenOrdersOutput = {
  canceled: false
  canceledAt: null
  createdAt: string
  filled: false
  filledAt: null
  id: string
  open: true
  price: number
  quantity: number
  side: 'b' | 's'
  tradingFee: number
  type: 'limit'
  uid: string
}[]

type GetOpenOrders = () => Promise<FuturesCrossGetOpenOrdersOutput>

export const createGetOpenOrders = (instance: KyInstance): GetOpenOrders => {
  return async () => {
    return instance.get('futures/cross/orders/open').json()
  }
}
