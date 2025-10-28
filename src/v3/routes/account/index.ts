import type { KyInstance } from 'ky'

import { createAddBitcoinAddress } from './add-bitcoin-address.js'
import { createDepositLightning } from './deposit-lightning.js'
import { createGetAccount } from './get-account.js'
import { createGetBitcoinAddress } from './get-bitcoin-address.js'
import { createGetInternalDeposits } from './get-internal-deposits.js'
import { createGetInternalWithdrawals } from './get-internal-withdrawals.js'
import { createGetLightningDeposits } from './get-lightning-deposits.js'
import { createGetLightningWithdrawals } from './get-lightning-withdrawals.js'
import { createGetOnChainDeposits } from './get-on-chain-deposits.js'
import { createGetOnChainWithdrawals } from './get-on-chain-withdrawals.js'
import { createWithdrawInternal } from './withdraw-internal.js'
import { createWithdrawLightning } from './withdraw-lightning.js'
import { createWithdrawOnChain } from './withdraw-on-chain.js'

export const createAccountRoute = (instance: KyInstance) => ({
  addBitcoinAddress: createAddBitcoinAddress(instance),
  depositLightning: createDepositLightning(instance),
  getAccount: createGetAccount(instance),
  getBitcoinAddress: createGetBitcoinAddress(instance),
  getInternalDeposits: createGetInternalDeposits(instance),
  getInternalWithdrawals: createGetInternalWithdrawals(instance),
  getLightningDeposits: createGetLightningDeposits(instance),
  getLightningWithdrawals: createGetLightningWithdrawals(instance),
  getOnChainDeposits: createGetOnChainDeposits(instance),
  getOnChainWithdrawals: createGetOnChainWithdrawals(instance),
  withdrawInternal: createWithdrawInternal(instance),
  withdrawLightning: createWithdrawLightning(instance),
  withdrawOnChain: createWithdrawOnChain(instance),
})

export type * from './add-bitcoin-address.js'
export type * from './deposit-lightning.js'
export type * from './get-account.js'
export type * from './get-bitcoin-address.js'
export type * from './get-internal-deposits.js'
export type * from './get-internal-withdrawals.js'
export type * from './get-lightning-deposits.js'
export type * from './get-lightning-withdrawals.js'
export type * from './get-on-chain-deposits.js'
export type * from './get-on-chain-withdrawals.js'
export type * from './withdraw-internal.js'
export type * from './withdraw-lightning.js'
export type * from './withdraw-on-chain.js'
