/**
 * Runnable example of rest/v3 — exercises the public surface area and, with
 * `--auth`, the read-only authenticated endpoints. Every response is annotated
 * with its imported output type so editors surface the exact return shape.
 *
 * Write endpoints (newOrder, newTrade, deposit, withdraw, swap, cancel, close,
 * setLeverage, addBitcoinAddress, readNotifications, …) are intentionally NOT
 * called. Their Input/Output types are re-exported at the bottom for reference.
 *
 * Run (public-only, signet):
 *   nub examples/rest-v3.ts
 *
 * Authenticated run reads creds by network:
 *   signet  → SIGNET_API_KEY, SIGNET_API_SECRET, SIGNET_API_PASSPHRASE
 *   mainnet → MAINNET_API_KEY, MAINNET_API_SECRET, MAINNET_API_PASSPHRASE
 *
 * nub does not auto-load .env, so source it first:
 *   set -a; source .env; set +a
 *   nub examples/rest-v3.ts --auth
 *
 * Defaults to signet. Pass --mainnet to opt in:
 *   nub examples/rest-v3.ts --mainnet
 *   nub examples/rest-v3.ts --mainnet --auth
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
  LightningDeposit,
  LightningWithdrawal,
  BitcoinDeposit,
  OnChainWithdrawal,
  // Markets
  MarketsOutput,
  PerpMarket,
  PerpMarketKey,
  // Perp — public
  PerpGetTickerOutput,
  PerpGetCandlesInput,
  PerpGetCandlesOutput,
  Candle,
  CandlesResolution,
  PerpGetFundingSettlementsInput,
  PerpGetFundingSettlementsOutput,
  PerpFundingSettlement,
  // Futures — public
  GetLeaderboardOutput,
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
  // Perp — isolated (read)
  PerpIsolatedGetOpenTradesOutput,
  PerpIsolatedGetRunningTradesOutput,
  PerpIsolatedGetClosedTradesInput,
  PerpIsolatedGetClosedTradesOutput,
  PerpIsolatedGetCanceledTradesInput,
  PerpIsolatedGetCanceledTradesOutput,
  PerpIsolatedGetFundingFeesInput,
  PerpIsolatedGetFundingFeesOutput,
  PerpOpenTrade,
  PerpClosedTrade,
  PerpCanceledTrade,
  PerpFundingFees,
  // Synthetic USD (read)
  GetBestPriceOutput,
  GetSwapsInput,
  GetSwapsOutput,
  Swap,
  FundingFees,
} from '../src/rest/v3/index.js'

const network: NonNullable<Options['network']> = process.argv.includes(
  '--mainnet'
)
  ? 'mainnet'
  : 'signet'
const wantAuth = process.argv.includes('--auth')

interface Creds {
  key: string
  secret: string
  passphrase: string
}

const resolveCreds = (net: typeof network): Creds => {
  const [keyVar, secretVar, passVar] =
    net === 'signet'
      ? ([
          'SIGNET_API_KEY',
          'SIGNET_API_SECRET',
          'SIGNET_API_PASSPHRASE',
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

// Every perp route takes a market key. List the markets and pick one that is
// not BTC/USD (e.g. gold: `{ instrument: 'quanto_perp', pair: 'xau_usdt' }`),
// falling back to BTC/USD when the network has no other perp market.
const markets: MarketsOutput = await client.markets()
const perpMarkets = markets.filter(
  (market): market is PerpMarket => market.instrument !== 'quanto_spot'
)
const otherMarket = perpMarkets.find((market) => market.pair !== 'btc_usd')
const market: PerpMarketKey = otherMarket
  ? { instrument: otherMarket.instrument, pair: otherMarket.pair }
  : { instrument: 'inverse_perp', pair: 'btc_usd' }
console.log(
  `[rest] markets → count=${markets.length} perp=${perpMarkets.length} using=${market.instrument}:${market.pair}`
)
await sleep(REQ_PACE_MS)

const ticker: PerpGetTickerOutput = await client.perp.getTicker(market)
console.log(
  `[rest] perp.getTicker → mark=${ticker.mark} lastPrice=${ticker.lastPrice} fundingRate=${ticker.fundingRate} quantoAdjustmentRate=${ticker.quantoAdjustmentRate} levels=${ticker.prices.length}`
)
await sleep(REQ_PACE_MS)

const candlesResolution: CandlesResolution = '1h'
const candlesInput: PerpGetCandlesInput = {
  ...market,
  from: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  limit: 5,
  range: candlesResolution,
}
const candles: PerpGetCandlesOutput = await client.perp.getCandles(candlesInput)
const [firstCandle]: readonly Candle[] = candles.data
console.log(
  `[rest] perp.getCandles → count=${candles.data.length} first=${
    firstCandle ? `o=${firstCandle.open} c=${firstCandle.close}` : '(empty)'
  } nextCursor=${candles.nextCursor?.value ?? '(none)'}`
)
await sleep(REQ_PACE_MS)

// Pass `nextCursor` back as `cursor` to read the next page.
if (candles.nextCursor) {
  const nextCandles: PerpGetCandlesOutput = await client.perp.getCandles({
    ...candlesInput,
    cursor: candles.nextCursor,
  })
  console.log(
    `[rest] perp.getCandles (page 2) → count=${nextCandles.data.length}`
  )
  await sleep(REQ_PACE_MS)
}

const leaderboard: GetLeaderboardOutput = await client.futures.getLeaderboard()
console.log(
  `[rest] futures.getLeaderboard → daily=${leaderboard.daily.length} weekly=${leaderboard.weekly.length} monthly=${leaderboard.monthly.length} allTime=${leaderboard['all-time'].length}`
)
await sleep(REQ_PACE_MS)

const fundingInput: PerpGetFundingSettlementsInput = { ...market, limit: 3 }
const fundingSettlements: PerpGetFundingSettlementsOutput =
  await client.perp.getFundingSettlements(fundingInput)
const [lastFunding]: readonly PerpFundingSettlement[] = fundingSettlements.data
console.log(
  `[rest] perp.getFundingSettlements → count=${fundingSettlements.data.length} last=${
    lastFunding
      ? `rate=${lastFunding.fundingRate} quanto=${lastFunding.quantoAdjustmentRate}@${lastFunding.time}`
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

  // Per-user perp reads span every market unless both keys name one.
  const openTrades: PerpIsolatedGetOpenTradesOutput =
    await client.perp.isolated.getOpenTrades(market)
  const [openTrade]: readonly PerpOpenTrade[] = openTrades
  console.log(
    `[rest] perp.isolated.getOpenTrades → count=${openTrades.length} first=${
      openTrade
        ? `${openTrade.side} ${openTrade.quantity}@${openTrade.price}`
        : '(empty)'
    }`
  )
  await sleep(REQ_PACE_MS)

  const runningTrades: PerpIsolatedGetRunningTradesOutput =
    await client.perp.isolated.getRunningTrades()
  const [runningTrade] = runningTrades
  console.log(
    `[rest] perp.isolated.getRunningTrades (all markets) → count=${runningTrades.length} first=${
      runningTrade
        ? `${runningTrade.instrument}:${runningTrade.pair} ${runningTrade.side} qty=${runningTrade.quantity} pl=${runningTrade.pl ?? '(no mark)'}`
        : '(empty)'
    }`
  )
  await sleep(REQ_PACE_MS)

  const closedInput: PerpIsolatedGetClosedTradesInput = { ...market, limit: 3 }
  const closedTrades: PerpIsolatedGetClosedTradesOutput =
    await client.perp.isolated.getClosedTrades(closedInput)
  const [closedTrade]: readonly PerpClosedTrade[] = closedTrades.data
  console.log(
    `[rest] perp.isolated.getClosedTrades → count=${closedTrades.data.length} first=${
      closedTrade
        ? `id=${closedTrade.id} pl=${closedTrade.pl} exit=${closedTrade.exitPrice}`
        : '(empty)'
    }`
  )
  await sleep(REQ_PACE_MS)

  const canceledInput: PerpIsolatedGetCanceledTradesInput = {
    ...market,
    limit: 3,
  }
  const canceledTrades: PerpIsolatedGetCanceledTradesOutput =
    await client.perp.isolated.getCanceledTrades(canceledInput)
  const [canceledTrade]: readonly PerpCanceledTrade[] = canceledTrades.data
  console.log(
    `[rest] perp.isolated.getCanceledTrades → count=${canceledTrades.data.length} first=${
      canceledTrade ? `id=${canceledTrade.id}` : '(empty)'
    }`
  )
  await sleep(REQ_PACE_MS)

  const isolatedFundingInput: PerpIsolatedGetFundingFeesInput = {
    ...market,
    limit: 3,
  }
  const isolatedFunding: PerpIsolatedGetFundingFeesOutput =
    await client.perp.isolated.getFundingFees(isolatedFundingInput)
  const [isolatedFundingHead]: readonly PerpFundingFees[] = isolatedFunding.data
  console.log(
    `[rest] perp.isolated.getFundingFees → count=${isolatedFunding.data.length} first=${
      isolatedFundingHead
        ? `fee=${isolatedFundingHead.fee} quanto=${isolatedFundingHead.quantoAdjustmentFee}`
        : '(empty)'
    }`
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
