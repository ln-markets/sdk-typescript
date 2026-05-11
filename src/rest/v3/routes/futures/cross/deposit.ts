import type { KyInstance } from 'ky'
import type { FuturesCrossPosition } from '../../../types.js'

export interface FuturesCrossDepositInput {
  amount: number
}

export type FuturesCrossDepositOutput = FuturesCrossPosition

type Deposit = (
  input: Readonly<FuturesCrossDepositInput>
) => Promise<FuturesCrossDepositOutput>

export const createDeposit = (instance: Readonly<KyInstance>): Deposit => {
  return async ({ amount }) => {
    return instance.post('futures/cross/deposit', { json: { amount } }).json()
  }
}
