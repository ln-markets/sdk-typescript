import type { KyInstance } from 'ky'
import type { FuturesCrossPosition } from '../../../types.js'

export interface FuturesCrossWithdrawInput {
  amount: number
}

export type FuturesCrossWithdrawOutput = FuturesCrossPosition

type Withdraw = (
  input: Readonly<FuturesCrossWithdrawInput>
) => Promise<FuturesCrossWithdrawOutput>

export const createWithdraw = (instance: Readonly<KyInstance>): Withdraw => {
  return async ({ amount }) => {
    return instance.post('futures/cross/withdraw', { json: { amount } }).json()
  }
}
