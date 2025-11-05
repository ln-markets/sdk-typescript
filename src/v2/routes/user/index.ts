import type { KyInstance } from 'ky'

import { createDepositSyntheticUsd } from './deposit-synthetic-usd.js'
import { createDeposit } from './deposit.js'
import { createGetBitcoinAddresses } from './get-bitcoin-addresses.js'
import { createGetDeposit } from './get-deposit.js'
import { createGetDeposits } from './get-deposits.js'
import { createGetUser } from './get-user.js'
import { createGetWithdrawal } from './get-withdrawal.js'
import { createGetWithdrawals } from './get-withdrawals.js'
import { createNewBitcoinAddress } from './new-bitcoin-address.js'
import { createTransfer } from './transfer.js'
import { createUpdateUser } from './update-user.js'
import { createWithdrawSyntheticUsd } from './withdraw-synthetic-usd.js'
import { createWithdraw } from './withdraw.js'

export const createUserRouter = (instance: KyInstance) => ({
  deposit: createDeposit(instance),
  depositSyntheticUsd: createDepositSyntheticUsd(instance),
  get: createGetUser(instance),
  getBitcoinAddresses: createGetBitcoinAddresses(instance),
  getDeposit: createGetDeposit(instance),
  getDeposits: createGetDeposits(instance),
  getWithdrawal: createGetWithdrawal(instance),
  getWithdrawals: createGetWithdrawals(instance),
  newBitcoinAddress: createNewBitcoinAddress(instance),
  transfer: createTransfer(instance),
  update: createUpdateUser(instance),
  withdraw: createWithdraw(instance),
  withdrawSyntheticUsd: createWithdrawSyntheticUsd(instance),
})
