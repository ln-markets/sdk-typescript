/**
 * Runnable example of rest/v3 — exercises the public surface area and, with
 * `--auth`, the read-only authenticated endpoints. Every response is annotated
 * with its imported output type so editors surface the exact return shape.
 *
 * Write endpoints (newOrder, newTrade, deposit, withdraw, swap, cancel, close,
 * setLeverage, addBitcoinAddress, readNotifications, …) are intentionally NOT
 * called. Their Input/Output types are re-exported at the bottom for reference.
 *
 * Run (public-only, mainnet):
 *   pnpm exec tsx examples/rest-v3.ts
 *
 * Authenticated run reads creds by network:
 *   mainnet  → MAINNET_API_KEY, MAINNET_API_SECRET, MAINNET_API_PASSPHRASE
 *   testnet4 → TESTNET4_API_KEY, TESTNET4_API_KEY_SECRET, TESTNET4_API_KEY_PASSPHRASE
 *
 * tsx does not auto-load .env, so source it first:
 *   set -a; source .env; set +a
 *   pnpm exec tsx examples/rest-v3.ts --auth
 *
 * Defaults to mainnet. Pass --testnet4 to opt in:
 *   pnpm exec tsx examples/rest-v3.ts --testnet4
 *   pnpm exec tsx examples/rest-v3.ts --testnet4 --auth
 */

import { createHttpClient } from '../src/rest/v3/index.js'
import type {
  Options,
  HttpClient,
  TimeOutput,
  // Account — read
  GetAccountOutput,
  GetBitcoinAddressOutput,
  GetNotificationsInput,
  GetNotificationsOutput,
  Notification,
  GetLightningDepositsInput,
  GetLightningDepositsOutput,
  GetLightningWithdrawalsInput,
  GetLightningWithdrawalsOutput,
  GetOnChainDepositsInput,
  GetOnChainDepositsOutput,
  GetOnChainWithdrawalsInput,
  GetOnChainWithdrawalsOutput,
  GetInternalDepositsInput,
  GetInternalDepositsOutput,
  GetInternalWithdrawalsInput,
  GetInternalWithdrawalsOutput,
  LightningDeposit,
  LightningWithdrawal,
  BitcoinDeposit,
  OnChainWithdrawal,
  InternalDeposit,
  InternalWithdrawal,
  // Futures — public
  GetTickerOutput,
  GetCandlesInput,
  GetCandlesOutput,
  Candle,
  CandlesResolution,
  GetLeaderboardOutput,
  GetFundingSettlementsInput,
  GetFundingSettlementsOutput,
  FundingSettlement,
  // Futures — cross (read)
  FuturesCrossGetPositionOutput,
  FuturesCrossGetOpenOrdersOutput,
  FuturesCrossGetFilledOrdersInput,
  FuturesCrossGetFilledOrdersOutput,
  FuturesCrossFilledOrder,
  FuturesCrossGetTransfersInput,
  FuturesCrossGetTransfersOutput,
  FuturesCrossTransfer,
  FuturesCrossGetFundingFeesInput,
  FuturesCrossGetFundingFeesOutput,
  // Futures — isolated (read)
  FuturesIsolatedGetOpenTradesOutput,
  FuturesIsolatedGetRunningTradesOutput,
  FuturesIsolatedGetClosedTradesInput,
  FuturesIsolatedGetClosedTradesOutput,
  FuturesIsolatedGetFundingFeesInput,
  FuturesIsolatedGetFundingFeesOutput,
  FuturesOpenTrade,
  FuturesRunningTrade,
  FuturesClosedTrade,
  FuturesCanceledTrade,
  // Oracle
  GetIndexInput,
  GetIndexOutput,
  GetLastPriceInput,
  GetLastPriceOutput,
  // Synthetic USD (read)
  GetBestPriceOutput,
  GetSwapsInput,
  GetSwapsOutput,
  Swap,
  FundingFees,
} from '../src/rest/v3/index.js'

const network: NonNullable<Options['network']> = process.argv.includes(
  '--testnet4'
)
  ? 'testnet4'
  : 'mainnet'
const wantAuth = process.argv.includes('--auth')

interface Creds {
  key: string
  secret: string
  passphrase: string
}

const resolveCreds = (net: typeof network): Creds => {
  const [keyVar, secretVar, passVar] =
    net === 'testnet4'
      ? ([
          'TESTNET4_API_KEY',
          'TESTNET4_API_KEY_SECRET',
          'TESTNET4_API_KEY_PASSPHRASE',
        ] as const)
      : ([
          'MAINNET_API_KEY',
          'MAINNET_API_SECRET',
          'MAINNET_API_PASSPHRASE',
        ] as const)

  const key = process.env[keyVar]
  const secret = process.env[secretVar]
  const passphrase = process.env[passVar]

  if (!key || !secret || !passphrase) {
    console.error(
      `--auth requires ${keyVar}, ${secretVar}, ${passVar} env vars (network=${net})`
    )
    process.exit(1)
  }
  return { key, secret, passphrase }
}

const options: Options = wantAuth
  ? { network, ...resolveCreds(network) }
  : { network }

// `HttpClient` mirrors the type returned by `createHttpClient` — exported so
// consumers can pass the client around without re-deriving the shape.
const client: HttpClient = createHttpClient(options)

const summarizeClosedTrade = (
  entry: FuturesCanceledTrade | FuturesClosedTrade
): string => {
  if (entry.canceled) {
    return `CANCELED id=${entry.id}`
  }
  return `CLOSED id=${entry.id} pl=${entry.pl} exit=${entry.exitPrice}`
}

// Public REST is rate-limited (HTTP 429 on tight bursts). Pace requests so a
// full top-to-bottom run stays under the public ceiling.
const REQ_PACE_MS = 1000
const sleep = async (ms: number): Promise<void> =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, ms)
  })

console.log(`[init] network=${network} authenticated=${wantAuth}`)

// ---------------------------------------------------------------------------
// Public endpoints
// ---------------------------------------------------------------------------

const ping: 'pong' = await client.ping()
console.log(`[rest] ping → ${ping}`)
await sleep(REQ_PACE_MS)

const time: TimeOutput = await client.time()
console.log(`[rest] time → ${time.time}`)
await sleep(REQ_PACE_MS)

const ticker: GetTickerOutput = await client.futures.getTicker()
console.log(
  `[rest] futures.getTicker → lastPrice=${ticker.lastPrice} index=${ticker.index} fundingRate=${ticker.fundingRate} levels=${ticker.prices.length}`
)
await sleep(REQ_PACE_MS)

const candlesResolution: CandlesResolution = '1h'
const candlesInput: GetCandlesInput = {
  from: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  limit: 5,
  range: candlesResolution,
}
const candles: GetCandlesOutput = await client.futures.getCandles(candlesInput)
const [firstCandle]: readonly Candle[] = candles.data
console.log(
  `[rest] futures.getCandles → count=${candles.data.length} first=${
    firstCandle ? `o=${firstCandle.open} c=${firstCandle.close}` : '(empty)'
  } nextCursor=${candles.nextCursor ?? '(none)'}`
)
await sleep(REQ_PACE_MS)

const leaderboard: GetLeaderboardOutput = await client.futures.getLeaderboard()
console.log(
  `[rest] futures.getLeaderboard → daily=${leaderboard.daily.length} weekly=${leaderboard.weekly.length} monthly=${leaderboard.monthly.length} allTime=${leaderboard['all-time'].length}`
)
await sleep(REQ_PACE_MS)

const fundingInput: GetFundingSettlementsInput = { limit: 3 }
const fundingSettlements: GetFundingSettlementsOutput =
  await client.futures.getFundingSettlements(fundingInput)
const [lastFunding]: readonly FundingSettlement[] = fundingSettlements.data
console.log(
  `[rest] futures.getFundingSettlements → count=${fundingSettlements.data.length} last=${
    lastFunding
      ? `rate=${lastFunding.fundingRate}@${lastFunding.time}`
      : '(empty)'
  }`
)
await sleep(REQ_PACE_MS)

const indexInput: GetIndexInput = { limit: 3 }
const indexPoints: GetIndexOutput = await client.oracle.getIndex(indexInput)
const [indexHead] = indexPoints
console.log(
  `[rest] oracle.getIndex → count=${indexPoints.length} head=${
    indexHead ? `${indexHead.index}@${indexHead.time}` : '(empty)'
  }`
)
await sleep(REQ_PACE_MS)

const lastPriceInput: GetLastPriceInput = { limit: 3 }
const lastPrices: GetLastPriceOutput =
  await client.oracle.getLastPrice(lastPriceInput)
const [lastPriceHead] = lastPrices
console.log(
  `[rest] oracle.getLastPrice → count=${lastPrices.length} head=${
    lastPriceHead
      ? `${lastPriceHead.lastPrice}@${lastPriceHead.time}`
      : '(empty)'
  }`
)
await sleep(REQ_PACE_MS)

const bestPrice: GetBestPriceOutput = await client.syntheticUsd.getBestPrice()
console.log(
  `[rest] syntheticUsd.getBestPrice → bid=${bestPrice.bidPrice} ask=${bestPrice.askPrice}`
)
await sleep(REQ_PACE_MS)

// ---------------------------------------------------------------------------
// Authenticated read endpoints (--auth)
// ---------------------------------------------------------------------------

if (wantAuth) {
  const account: GetAccountOutput = await client.account.get()
  console.log(
    `[rest] account.get → id=${account.id} username=${account.username} balance=${account.balance}`
  )
  await sleep(REQ_PACE_MS)

  const btcAddress: GetBitcoinAddressOutput =
    await client.account.getBitcoinAddress()
  console.log(`[rest] account.getBitcoinAddress → ${btcAddress.address}`)
  await sleep(REQ_PACE_MS)

  const notificationsInput: GetNotificationsInput = { limit: 3 }
  const notifications: GetNotificationsOutput =
    await client.account.getNotifications(notificationsInput)
  const [firstNotification]: readonly Notification[] = notifications.data
  console.log(
    `[rest] account.getNotifications → count=${notifications.data.length} first=${
      firstNotification
        ? `${firstNotification.event}@${firstNotification.createdAt}`
        : '(empty)'
    }`
  )
  await sleep(REQ_PACE_MS)

  const lnDepositsInput: GetLightningDepositsInput = { limit: 3 }
  const lnDeposits: GetLightningDepositsOutput =
    await client.account.getLightningDeposits(lnDepositsInput)
  const [lnDeposit]: readonly LightningDeposit[] = lnDeposits.data
  console.log(
    `[rest] account.getLightningDeposits → count=${lnDeposits.data.length} first=${
      lnDeposit
        ? `${lnDeposit.amount}sat settled=${lnDeposit.settledAt !== null}`
        : '(empty)'
    }`
  )
  await sleep(REQ_PACE_MS)

  const lnWithdrawalsInput: GetLightningWithdrawalsInput = { limit: 3 }
  const lnWithdrawals: GetLightningWithdrawalsOutput =
    await client.account.getLightningWithdrawals(lnWithdrawalsInput)
  const [lnWithdrawal]: readonly LightningWithdrawal[] = lnWithdrawals.data
  console.log(
    `[rest] account.getLightningWithdrawals → count=${lnWithdrawals.data.length} first=${
      lnWithdrawal
        ? `${lnWithdrawal.amount}sat status=${lnWithdrawal.status}`
        : '(empty)'
    }`
  )
  await sleep(REQ_PACE_MS)

  const onChainDepositsInput: GetOnChainDepositsInput = { limit: 3 }
  const onChainDeposits: GetOnChainDepositsOutput =
    await client.account.getOnChainDeposits(onChainDepositsInput)
  const [onChainDeposit]: readonly BitcoinDeposit[] = onChainDeposits.data
  console.log(
    `[rest] account.getOnChainDeposits → count=${onChainDeposits.data.length} first=${
      onChainDeposit
        ? `${onChainDeposit.amount}sat status=${onChainDeposit.status}`
        : '(empty)'
    }`
  )
  await sleep(REQ_PACE_MS)

  const onChainWithdrawalsInput: GetOnChainWithdrawalsInput = { limit: 3 }
  const onChainWithdrawals: GetOnChainWithdrawalsOutput =
    await client.account.getOnChainWithdrawals(onChainWithdrawalsInput)
  const [onChainWithdrawal]: readonly OnChainWithdrawal[] =
    onChainWithdrawals.data
  console.log(
    `[rest] account.getOnChainWithdrawals → count=${onChainWithdrawals.data.length} first=${
      onChainWithdrawal
        ? `${onChainWithdrawal.amount}sat status=${onChainWithdrawal.status}`
        : '(empty)'
    }`
  )
  await sleep(REQ_PACE_MS)

  const internalDepositsInput: GetInternalDepositsInput = { limit: 3 }
  const internalDeposits: GetInternalDepositsOutput =
    await client.account.getInternalDeposits(internalDepositsInput)
  const [internalDeposit]: readonly InternalDeposit[] = internalDeposits.data
  console.log(
    `[rest] account.getInternalDeposits → count=${internalDeposits.data.length} first=${
      internalDeposit
        ? `${internalDeposit.amount}sat from=${internalDeposit.fromUsername}`
        : '(empty)'
    }`
  )
  await sleep(REQ_PACE_MS)

  const internalWithdrawalsInput: GetInternalWithdrawalsInput = { limit: 3 }
  const internalWithdrawals: GetInternalWithdrawalsOutput =
    await client.account.getInternalWithdrawals(internalWithdrawalsInput)
  const [internalWithdrawal]: readonly InternalWithdrawal[] =
    internalWithdrawals.data
  console.log(
    `[rest] account.getInternalWithdrawals → count=${internalWithdrawals.data.length} first=${
      internalWithdrawal
        ? `${internalWithdrawal.amount}sat to=${internalWithdrawal.toUsername}`
        : '(empty)'
    }`
  )
  await sleep(REQ_PACE_MS)

  // getPosition may 404 / throw for fresh accounts with no open position.
  try {
    const position: FuturesCrossGetPositionOutput =
      await client.futures.cross.getPosition()
    console.log(
      `[rest] futures.cross.getPosition → qty=${position.quantity} margin=${position.margin} pl=${position.totalPl}`
    )
  } catch (error) {
    console.log(
      `[rest] futures.cross.getPosition → (none) ${(error as Error).message}`
    )
  }
  await sleep(REQ_PACE_MS)

  const openOrders: FuturesCrossGetOpenOrdersOutput =
    await client.futures.cross.getOpenOrders()
  console.log(`[rest] futures.cross.getOpenOrders → count=${openOrders.length}`)
  await sleep(REQ_PACE_MS)

  const filledInput: FuturesCrossGetFilledOrdersInput = { limit: 3 }
  const filledOrders: FuturesCrossGetFilledOrdersOutput =
    await client.futures.cross.getFilledOrders(filledInput)
  const [filledOrder]: readonly FuturesCrossFilledOrder[] = filledOrders.data
  console.log(
    `[rest] futures.cross.getFilledOrders → count=${filledOrders.data.length} first=${
      filledOrder
        ? `${filledOrder.side} ${filledOrder.quantity}@${filledOrder.price}`
        : '(empty)'
    }`
  )
  await sleep(REQ_PACE_MS)

  const transfersInput: FuturesCrossGetTransfersInput = { limit: 3 }
  const transfers: FuturesCrossGetTransfersOutput =
    await client.futures.cross.getTransfers(transfersInput)
  const [transfer]: readonly FuturesCrossTransfer[] = transfers.data
  console.log(
    `[rest] futures.cross.getTransfers → count=${transfers.data.length} first=${
      transfer ? `${transfer.amount}sat@${transfer.time}` : '(empty)'
    }`
  )
  await sleep(REQ_PACE_MS)

  const crossFundingInput: FuturesCrossGetFundingFeesInput = { limit: 3 }
  const crossFunding: FuturesCrossGetFundingFeesOutput =
    await client.futures.cross.getFundingFees(crossFundingInput)
  const [crossFundingHead]: readonly FundingFees[] = crossFunding.data
  console.log(
    `[rest] futures.cross.getFundingFees → count=${crossFunding.data.length} first=${
      crossFundingHead
        ? `${crossFundingHead.fee}sat@${crossFundingHead.time}`
        : '(empty)'
    }`
  )
  await sleep(REQ_PACE_MS)

  const openTrades: FuturesIsolatedGetOpenTradesOutput =
    await client.futures.isolated.getOpenTrades()
  const [openTrade]: readonly FuturesOpenTrade[] = openTrades
  console.log(
    `[rest] futures.isolated.getOpenTrades → count=${openTrades.length} first=${
      openTrade
        ? `${openTrade.side} ${openTrade.quantity}@${openTrade.price}`
        : '(empty)'
    }`
  )
  await sleep(REQ_PACE_MS)

  const runningTrades: FuturesIsolatedGetRunningTradesOutput =
    await client.futures.isolated.getRunningTrades()
  const [runningTrade]: readonly FuturesRunningTrade[] = runningTrades
  console.log(
    `[rest] futures.isolated.getRunningTrades → count=${runningTrades.length} first=${
      runningTrade
        ? `${runningTrade.side} qty=${runningTrade.quantity} pl=${runningTrade.pl}`
        : '(empty)'
    }`
  )
  await sleep(REQ_PACE_MS)

  const closedInput: FuturesIsolatedGetClosedTradesInput = { limit: 3 }
  const closedTrades: FuturesIsolatedGetClosedTradesOutput =
    await client.futures.isolated.getClosedTrades(closedInput)
  // Union of canceled + closed trades — discriminate on `canceled`.
  const [closedEntry]: readonly (FuturesCanceledTrade | FuturesClosedTrade)[] =
    closedTrades.data
  console.log(
    `[rest] futures.isolated.getClosedTrades → count=${closedTrades.data.length} first=${
      closedEntry ? summarizeClosedTrade(closedEntry) : '(empty)'
    }`
  )
  await sleep(REQ_PACE_MS)

  const isolatedFundingInput: FuturesIsolatedGetFundingFeesInput = { limit: 3 }
  const isolatedFunding: FuturesIsolatedGetFundingFeesOutput =
    await client.futures.isolated.getFundingFees(isolatedFundingInput)
  console.log(
    `[rest] futures.isolated.getFundingFees → count=${isolatedFunding.data.length}`
  )
  await sleep(REQ_PACE_MS)

  const swapsInput: GetSwapsInput = { limit: 3 }
  const swaps: GetSwapsOutput = await client.syntheticUsd.getSwaps(swapsInput)
  const [swap]: readonly Swap[] = swaps.data
  console.log(
    `[rest] syntheticUsd.getSwaps → count=${swaps.data.length} first=${
      swap
        ? `${swap.inAmount}${swap.inAsset} → ${swap.outAmount}${swap.outAsset}`
        : '(empty)'
    }`
  )
}

console.log('[done]')
