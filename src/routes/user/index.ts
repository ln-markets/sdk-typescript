import type { RestFetcher } from '#src/rest.js'

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

export const createUserRouter = (request: RestFetcher) => ({
  deposit: createDeposit(request),
  depositSyntheticUsd: createDepositSyntheticUsd(request),
  get: createGetUser(request),
  getBitcoinAddresses: createGetBitcoinAddresses(request),
  getDeposit: createGetDeposit(request),
  getDeposits: createGetDeposits(request),
  getWithdrawal: createGetWithdrawal(request),
  getWithdrawals: createGetWithdrawals(request),
  newBitcoinAddress: createNewBitcoinAddress(request),
  transfer: createTransfer(request),
  update: createUpdateUser(request),
  withdraw: createWithdraw(request),
  withdrawSyntheticUsd: createWithdrawSyntheticUsd(request),
})
