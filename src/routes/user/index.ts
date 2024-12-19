import type { UUID } from '../../index.js'
import type { RestFetcher } from '../../rest.js'

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

export type ApiKeyCreation = {
  name: string
  passphrase: string
  permissions: string[]
}

export type BitcoinDeposit = {
  amount: number
  blockId?: string
  confirmationHeight?: number
  confirmedTs?: number
  id: string
  isConfirmed: boolean
  transactionId: string
  ts: number
}

export type Currency = 'btc' | 'usd'

export type Deposit = BitcoinDeposit | InternalTransfer | LightningDeposit

export type DepositType = 'bitcoin' | 'internal' | 'lightning'

export type FeeTier = 0 | 1 | 2 | 3

export type FetchTransactionsRequest = {
  cursor?: number
  from?: number
  limit?: number
  to?: number
  types?: string
}

export type GenericDeposit = GenericDepositError | GenericDepositSuccess

export type GenericDepositBase = {
  amount: number
  comment?: string
  id: string
  success: boolean
  transactionIdOrHash: string
  ts: number
  type: DepositType
}

export type GenericDepositError = Omit<
  GenericDepositBase,
  'transactionIdOrHash'
> & {
  success: false
  transactionIdOrHash?: string
}

export type GenericDepositSuccess = GenericDepositBase & {
  success: true
}

export type GenericOnChainWithdrawal = Omit<
  GenericWithdrawalSuccess,
  'success' | 'transactionIdOrHash' | 'type'
> & {
  status: OnChainWithdrawalStatus
  transactionIdOrHash?: string
  type: 'bitcoin'
}

export type GenericWithdrawal =
  | GenericWithdrawalError
  | GenericWithdrawalSuccess

export type GenericWithdrawalBase = {
  amount: number
  fee: number
  id: string
  success: boolean
  transactionIdOrHash: string
  ts: number
  type: 'internal' | 'lightning'
}

export type GenericWithdrawalError = Omit<GenericWithdrawalBase, 'fee'> & {
  fee?: number
  success: false
}

export type GenericWithdrawalSuccess = GenericWithdrawalBase & {
  success: true
}

export type InternalTransfer = {
  amount: number
  fromUsername: string
  id: string
  success: boolean
  toUsername: string
  ts: number
}

export type InternalWithdrawalCondensed = Pick<
  InternalTransfer,
  'amount' | 'id' | 'success' | 'toUsername'
> & {
  ts: number
  type: 'internal'
}

export type Leaderboard = {
  allTime: LeaderboardEntry[]
  daily: LeaderboardEntry[]
  monthly: LeaderboardEntry[]
  weekly: LeaderboardEntry[]
}

export type LeaderboardEntry = {
  direction: number
  pl: number
  username: string
}

export type LightningDeposit = {
  amount: number
  comment?: string
  id: string
  paymentHash: string
  success: boolean
  successTs?: number
  ts: number
}

export type LightningWithdrawalCondensed = {
  amount: number
  destination?: string
  fee: number
  id: string
  paymentHash: string
  success: boolean
  ts: number
  type: 'lightning'
}

export type NewApiKey = {
  creationTs: number
  id: string
  key: string
  lastModified: number
  name?: string
  permissions: string[]
  secret: string
}

export type OnChainWithdrawalCondensed = {
  address: string
  amount: number
  fee: number
  id: string
  status: OnChainWithdrawalStatus
  transactionId: string
  ts: number
  type: 'bitcoin'
}

export type OnChainWithdrawalStatus = 'confirmed' | 'failed' | 'pending'

export type TotpSetup = {
  backupCodes: string[]
  secret: string
  url: string
}

export type User = {
  accountType: string
  autoWithdrawEnabled: boolean
  autoWithdrawLightningAddress?: string
  balance: number
  email?: string
  emailConfirmed: boolean
  feeTier: FeeTier
  linkingPublicKey?: string
  metrics: unknown
  nostrPubkey?: string
  role: string
  showLeaderboard: boolean
  syntheticUsdBalance: number
  totpEnabled: boolean
  uid: UUID
  username: string
  useTaprootAddresses: boolean
  webauthnEnabled: boolean
}

export type WithdrawalCondensed =
  | InternalWithdrawalCondensed
  | LightningWithdrawalCondensed
  | OnChainWithdrawalCondensed
