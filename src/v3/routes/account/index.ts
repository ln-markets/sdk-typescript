import type { KyInstance } from 'ky'

import { createAddBitcoinAddress } from './add-bitcoin-address.js'
import { createDepositLightning } from './deposit-lightning.js'
import { createGetAccount } from './get-account.js'
import { createGetBitcoinAddress } from './get-bitcoin-address.js'
import { createGetInternalDeposits } from './get-internal-deposits.js'
import { createGetInternalWithdrawals } from './get-internal-withdrawals.js'
import { createGetLightningDeposits } from './get-lightning-deposits.js'
import { createGetLightningWithdrawals } from './get-lightning-withdrawals.js'
import { createGetNotifications } from './get-notifications.js'
import { createGetOnChainDeposits } from './get-on-chain-deposits.js'
import { createGetOnChainWithdrawals } from './get-on-chain-withdrawals.js'
import { createReadNotifications } from './read-notifications.js'
import { createWithdrawInternal } from './withdraw-internal.js'
import { createWithdrawLightning } from './withdraw-lightning.js'
import { createWithdrawOnChain } from './withdraw-on-chain.js'

export const createAccountRoute = (instance: KyInstance) => ({
  addBitcoinAddress: createAddBitcoinAddress(instance),
  depositLightning: createDepositLightning(instance),
  get: createGetAccount(instance),
  getBitcoinAddress: createGetBitcoinAddress(instance),
  getInternalDeposits: createGetInternalDeposits(instance),
  getInternalWithdrawals: createGetInternalWithdrawals(instance),
  getLightningDeposits: createGetLightningDeposits(instance),
  getLightningWithdrawals: createGetLightningWithdrawals(instance),
  getNotifications: createGetNotifications(instance),
  getOnChainDeposits: createGetOnChainDeposits(instance),
  getOnChainWithdrawals: createGetOnChainWithdrawals(instance),
  readNotifications: createReadNotifications(instance),
  withdrawInternal: createWithdrawInternal(instance),
  withdrawLightning: createWithdrawLightning(instance),
  withdrawOnChain: createWithdrawOnChain(instance),
})

export type {
  AddBitcoinAddressInput,
  AddBitcoinAddressOutput,
} from './add-bitcoin-address.js'
export type {
  DepositLightningInput,
  DepositLightningOutput,
} from './deposit-lightning.js'
export type { GetAccountOutput } from './get-account.js'
export type { GetBitcoinAddressOutput } from './get-bitcoin-address.js'
export type {
  GetInternalDepositsInput,
  GetInternalDepositsOutput,
} from './get-internal-deposits.js'
export type {
  GetInternalWithdrawalsInput,
  GetInternalWithdrawalsOutput,
} from './get-internal-withdrawals.js'
export type {
  GetLightningDepositsInput,
  GetLightningDepositsOutput,
} from './get-lightning-deposits.js'
export type {
  GetLightningWithdrawalsInput,
  GetLightningWithdrawalsOutput,
} from './get-lightning-withdrawals.js'
export type {
  GetNotificationsInput,
  GetNotificationsOutput,
} from './get-notifications.js'
export type {
  GetOnChainDepositsInput,
  GetOnChainDepositsOutput,
} from './get-on-chain-deposits.js'
export type {
  GetOnChainWithdrawalsInput,
  GetOnChainWithdrawalsOutput,
} from './get-on-chain-withdrawals.js'
export type {
  WithdrawInternalInput,
  WithdrawInternalOutput,
} from './withdraw-internal.js'
export type {
  WithdrawLightningInput,
  WithdrawLightningOutput,
} from './withdraw-lightning.js'
export type {
  WithdrawOnChainInput,
  WithdrawOnChainOutput,
} from './withdraw-on-chain.js'
