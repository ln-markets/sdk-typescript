import type { KyInstance } from 'ky'
import type { PaginationInput } from '../../../types.js'

export type FuturesCrossGetTransfersInput = PaginationInput

export type FuturesCrossGetTransfersOutput = {
  amount: number
  id: string
  time: Date
  uid: string
}[]

type GetTransfers = (
  input: FuturesCrossGetTransfersInput
) => Promise<FuturesCrossGetTransfersOutput>

export const createGetTransfers = (instance: KyInstance): GetTransfers => {
  return async ({ from, limit, to }) => {
    return instance
      .get('futures/cross/transfers', { searchParams: { from, limit, to } })
      .json()
  }
}
