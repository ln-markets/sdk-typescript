import type { KyInstance } from 'ky'
import type { FuturesCrossPosition } from '../../../types.js'

export interface FuturesCrossWithdrawInput {
  amount: number
}

export type FuturesCrossWithdrawOutput = FuturesCrossPosition

type Withdraw = (
  input: FuturesCrossWithdrawInput
) => Promise<FuturesCrossWithdrawOutput>

export const createWithdraw = (instance: KyInstance): Withdraw => {
  return async ({ amount }) => {
    return instance.post('futures/cross/withdraw', { json: { amount } }).json()
  }
}
