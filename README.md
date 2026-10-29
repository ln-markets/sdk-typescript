<p align="center" width="100%">
  <img
    src="https://app.lnmarkets.com/images/logo-gradient.svg"
    style="display:block;margin: 0 auto"
    width=50%
    height=50%
    alt="LN Market's logo"
  />
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@ln-markets/sdk" alt="npm version">
    <img
      alt="NPM Package Version"
      src="https://img.shields.io/npm/v/@ln-markets/sdk"
    />
  </a>
  <a href="https://www.npmjs.com/package/@ln-markets/sdk" alt="npm downloads">
    <img
      alt="NPM Package Downloads"
      src="https://img.shields.io/npm/dw/@ln-markets/sdk"
    />
  </a>
  <a href="https://twitter.com/LNMarkets">
    <img
      src="https://img.shields.io/twitter/follow/LNMarkets?style=social"
      alt="Follow us on X (Twitter)"
    >
  </a>
</p>

<h1 align="center">LN Markets TypeScript SDK</h1>

<p align="center">
  <a href="https://lnmarkets.com">
    Website
  </a>
  -
  <a href="https://api.lnmarkets.com/v3/">
    API Reference
  </a>
  -
  <a href="https://github.com/ln-markets/sdk-python">
    Python SDK
  </a>
</p>

## Getting Started

### Setup

Install our SDK using your preferred package manager:

```bash
npm install @ln-markets/sdk
```

```bash
pnpm install @ln-markets/sdk
```

```bash
yarn add @ln-markets/sdk
```

```bash
bun add @ln-markets/sdk
```

### Network

By default, the SDK will connect to the LN Markets mainnet environment. You can change this by passing the `network` option to the `createHttpClient` function.

```typescript
import { createHttpClient } from '@ln-markets/sdk/rest/v3'

const client = createHttpClient({
  network: 'signet', // 'mainnet' or 'signet'
})
```

### Unauthenticated client

You can use an unauthenticated client to access public endpoints.

```typescript
import { createHttpClient } from '@ln-markets/sdk/rest/v3'

const client = createHttpClient()

// Check server time
const time = await client.time()
// => { time: 1698765432 }

// Ping the server
const pong = await client.ping()
// => 'pong'

// List the available markets
const markets = await client.markets()
// => [{ instrument: 'inverse_perp', pair: 'btc_usd', ... }, { instrument: 'quanto_perp', pair: 'xau_usdt', ... }]

// Get current ticker information of a perp market
const ticker = await client.perp.getTicker({
  instrument: 'inverse_perp',
  pair: 'btc_usd',
})
// => { instrument: 'inverse_perp', pair: 'btc_usd', mark: 67500, lastPrice: 67520, ... }

// Get candles data
const candles = await client.perp.getCandles({
  instrument: 'inverse_perp',
  pair: 'btc_usd',
  from: '2023-10-31T00:00:00Z',
  to: '2023-11-01T00:00:00Z',
  range: '1h',
})

// Get leaderboard
const leaderboard = await client.futures.getLeaderboard()
```

### Authenticated client

You can authenticate using your API key, secret and passphrase directly passed to the `createHttpClient` function.

You can get your API key, secret and passphrase from the [API Keys section](https://lnmarkets.com/en/user/api) of your LN Markets account.

> :warning: **Important:** Your API key, secret and passphrase are sensitive and should be kept secure. Do not expose them in your client-side code, nor share them with anyone. Any leakage of your API key, secret or passphrase may lead to unauthorized access to your account and irreversible loss of funds.

```typescript
import { createHttpClient } from '@ln-markets/sdk/rest/v3'

const client = createHttpClient({
  key: 'your-api-key',
  secret: 'your-api-secret',
  passphrase: 'your-api-key-passphrase',
})

// Get account information
const account = await client.account.get()
// => { balance: 100000, syntheticUsdBalance: 50, username: 'trader123', ... }

// Get lightning deposits history
const deposits = await client.account.getLightningDeposits()

// Get lightning withdrawals history
const withdrawals = await client.account.getLightningWithdrawals()
```

## API v3 Examples

### Perp Trading - Isolated Margin

The `perp` routes (`/v3/perp/*`) trade any perpetual market. Every call takes the market key: `instrument` and `pair`. Use `client.markets()` to list the markets and their keys.

The example below trades gold (`xau_usdt`), a quanto market. For BTC/USD, use `{ instrument: 'inverse_perp', pair: 'btc_usd' }`.

```typescript
import { createHttpClient } from '@ln-markets/sdk/rest/v3'

const client = createHttpClient({
  key: 'your-api-key',
  secret: 'your-api-secret',
  passphrase: 'your-api-key-passphrase',
})

const gold = { instrument: 'quanto_perp', pair: 'xau_usdt' } as const

// Market data
const ticker = await client.perp.getTicker(gold)
// => { mark: 4033.5, fundingRate: 0.00007, quantoAdjustmentRate: 0, ... }

const fundingSettlements = await client.perp.getFundingSettlements({
  ...gold,
  limit: 10,
})

// Open a long position with a market order
const trade = await client.perp.isolated.newTrade({
  ...gold,
  type: 'market',
  side: 'buy',
  quantity: 0.01, // In the market quantity unit (oz of gold here)
  leverage: 5,
  stoploss: { mode: 'fixed', value: 3800 },
})

// Manage the position
await client.perp.isolated.addMargin({ ...gold, id: trade.id, amount: 5000 })
await client.perp.isolated.cashIn({ ...gold, id: trade.id, amount: 1000 })
await client.perp.isolated.updateTakeprofit({
  ...gold,
  id: trade.id,
  value: 4500,
})
await client.perp.isolated.updateStoploss({
  ...gold,
  id: trade.id,
  stoploss: { mode: 'trailing', value: 0.05 }, // 5% trailing distance
})
await client.perp.isolated.removeTakeprofit({ ...gold, id: trade.id })
await client.perp.isolated.removeStoploss({ ...gold, id: trade.id })

// Close the position
await client.perp.isolated.close({ ...gold, id: trade.id })

// Cancel one pending order, or all pending orders of the market
await client.perp.isolated.cancel({ ...gold, id: 'trade-id' })
await client.perp.isolated.cancelAll(gold)

// Reads span every market when you leave out the market key
const allRunningTrades = await client.perp.isolated.getRunningTrades()
const goldOpenTrades = await client.perp.isolated.getOpenTrades(gold)

// History reads use cursor pagination: pass `nextCursor` back as `cursor`
const page = await client.perp.isolated.getClosedTrades({ ...gold, limit: 50 })
if (page.nextCursor) {
  const nextPage = await client.perp.isolated.getClosedTrades({
    ...gold,
    limit: 50,
    cursor: page.nextCursor,
  })
}
const canceledTrades = await client.perp.isolated.getCanceledTrades(gold)
const fundingFees = await client.perp.isolated.getFundingFees(gold)
```

### Futures Trading - Isolated Margin (deprecated)

> :warning: **Deprecated:** `client.futures.getTicker`, `client.futures.getCandles`, `client.futures.getFundingSettlements` and `client.futures.isolated.*` still work, but they only trade BTC/USD. Use the matching `client.perp` method with `{ instrument: 'inverse_perp', pair: 'btc_usd' }` instead.

Isolated margin mode allows you to limit the risk to a specific position. Each position has its own margin.

```typescript
import { createHttpClient } from '@ln-markets/sdk/rest/v3'

const client = createHttpClient({
  key: 'your-api-key',
  secret: 'your-api-secret',
  passphrase: 'your-api-key-passphrase',
})

// Open a new long position with market order
const marketTrade = await client.futures.isolated.newTrade({
  type: 'market',
  side: 'buy',
  quantity: 10000,
  leverage: 25,
})

// Open a long position with limit order
const limitTrade = await client.futures.isolated.newTrade({
  type: 'limit',
  side: 'buy',
  price: 67000, // Limit price
  margin: 20000,
  leverage: 10,
})

// Get all open trades (orders waiting to be filled)
const openTrades = await client.futures.isolated.getOpenTrades()

// Get all running trades (filled positions)
const runningTrades = await client.futures.isolated.getRunningTrades()

// Get closed trades history
const closedTrades = await client.futures.isolated.getClosedTrades()

// Add margin to an existing position
await client.futures.isolated.addMargin({
  id: 'trade-id',
  amount: 5000,
})

// Update take-profit
await client.futures.isolated.updateTakeprofit({
  id: 'trade-id',
  value: 72000,
})

// Update stop-loss
await client.futures.isolated.updateStoploss({
  id: 'trade-id',
  value: 66000,
})

// Close a specific position
await client.futures.isolated.close({
  id: 'trade-id',
})

// Cancel a pending order
await client.futures.isolated.cancel({
  id: 'trade-id',
})

// Cancel all pending orders
await client.futures.isolated.cancelAll()

// Get funding fees history
const fundingFees = await client.futures.isolated.getFundingFees({
  from: '2023-10-31T00:00:00Z',
  to: '2023-11-01T00:00:00Z',
})

// Cash in profits from a running position (partial close)
await client.futures.isolated.cashIn({
  id: 'trade-id',
  amount: 5000, // Amount in satoshis to cash in
})
```

### Futures Trading - Cross Margin

Cross margin mode shares margin across all positions. This allows for more efficient margin usage but increases risk as losses from one position can affect others.

```typescript
import { createHttpClient } from '@ln-markets/sdk/rest/v3'

const client = createHttpClient({
  key: 'your-api-key',
  secret: 'your-api-secret',
  passphrase: 'your-api-key-passphrase',
})

// First, deposit funds into cross margin account.
// Returns the updated FuturesCrossPosition.
await client.futures.cross.deposit({
  amount: 100000, // Amount in satoshis
})

// Set leverage for cross margin trading
await client.futures.cross.setLeverage({
  leverage: 25,
})

// Place a market order
const marketOrder = await client.futures.cross.newOrder({
  type: 'market',
  side: 'buy', // 'buy' for buy/long, 'sell' for sell/short
  quantity: 1000, // Quantity in USD
})

// Place a limit order
const limitOrder = await client.futures.cross.newOrder({
  type: 'limit',
  side: 'sell',
  quantity: 500,
  price: 68000,
})

// Get current position
const position = await client.futures.cross.getPosition()

// Get open orders
const openOrders = await client.futures.cross.getOpenOrders()

// Get filled orders history
const filledOrders = await client.futures.cross.getFilledOrders({
  from: '2023-10-31T00:00:00Z',
  to: '2023-11-01T00:00:00Z',
})

// Cancel a specific order
await client.futures.cross.cancel({
  id: 'order-id',
})

// Cancel all open orders
await client.futures.cross.cancelAll()

// Close entire position
await client.futures.cross.close()

// Get funding fees history
const fundingFees = await client.futures.cross.getFundingFees({
  from: '2023-10-31T00:00:00Z',
  to: '2023-11-01T00:00:00Z',
})

// Get transfers history (deposits/withdrawals)
const transfers = await client.futures.cross.getTransfers({
  from: '2023-10-31T00:00:00Z',
  to: '2023-11-01T00:00:00Z',
})

// Withdraw funds from cross margin account.
// Returns the updated FuturesCrossPosition.
await client.futures.cross.withdraw({
  amount: 50000,
})
```

### Account Management

```typescript
import { createHttpClient } from '@ln-markets/sdk/rest/v3'

const client = createHttpClient({
  key: 'your-api-key',
  secret: 'your-api-secret',
  passphrase: 'your-api-key-passphrase',
})

// Get account information
const account = await client.account.get()
console.log(`Balance: ${account.balance} sats`)
console.log(`Synthetic USD Balance: ${account.syntheticUsdBalance}`)

// Create a Lightning deposit invoice
const depositInvoice = await client.account.depositLightning({
  amount: 100000, // Amount in satoshis
})
console.log(`Pay this invoice: ${depositInvoice.invoice}`)

// Withdraw via Lightning
const withdrawal = await client.account.withdrawLightning({
  invoice: 'lnbc...', // Lightning invoice to pay
})

// Get or add Bitcoin on-chain address
const address = await client.account.getBitcoinAddress()
// or generate a new one (server-side). Optionally choose the script format.
const newAddress = await client.account.addBitcoinAddress({
  format: 'p2tr', // 'p2tr' (default) or 'p2wpkh'
})

// Withdraw on-chain
const onChainWithdrawal = await client.account.withdrawOnChain({
  address: 'bc1q...',
  amount: 100000,
})

// Get transaction histories
const lightningDeposits = await client.account.getLightningDeposits()
const lightningWithdrawals = await client.account.getLightningWithdrawals()
const onChainDeposits = await client.account.getOnChainDeposits()
const onChainWithdrawals = await client.account.getOnChainWithdrawals()
```

### Synthetic USD

Synthetic USD allows you to swap between BTC and USD-denominated positions.

```typescript
import { createHttpClient } from '@ln-markets/sdk/rest/v3'

const client = createHttpClient({
  key: 'your-api-key',
  secret: 'your-api-secret',
  passphrase: 'your-api-key-passphrase',
})

// Get best price for swap (current ask/bid)
const bestPrice = await client.syntheticUsd.getBestPrice()

// Create a new swap by specifying input amount + assets
const swap = await client.syntheticUsd.newSwap({
  inAmount: 100,
  inAsset: 'USD',
  outAsset: 'BTC',
})

// Get swap history
const swaps = await client.syntheticUsd.getSwaps()
```

## API v3 Features

The v3 API provides the following routes:

- **account**: Account management (balance, info, deposits, withdrawals)
- **markets**: List the available markets
- **perp**: Perp trading on any market (isolated trades, market data)
- **futures**: BTC/USD futures trading (cross margin, leaderboard; isolated and market data are deprecated, use **perp**)
- **syntheticUsd**: Synthetic USD operations
- **time**: Server time
- **ping**: Health check endpoint

## Stream API (stream/v1)

The Stream API delivers realtime market data and private events over a single WebSocket connection (JSON-RPC 2.0). Subscribe to topics like `futures/inverse/btc_usd/ticker`, OHLC candles per resolution, and (when authenticated) wallet + position events.

### Stream Setup

Create a stream client and connect. By default the client targets mainnet and reconnects automatically.

```typescript
import { createStreamClient } from '@ln-markets/sdk/stream/v1'

const client = createStreamClient({
  network: 'mainnet', // 'mainnet' or 'signet'
  reconnectInterval: 5000,
  reconnectEnabled: true,
  maxReconnectAttempts: 5,
})

await client.connect()
```

### Connect and authenticate

Public topics (ticker, lastPrice, index, buckets, funding, OHLC, announcements) require no authentication. Private topics (`wallet/*`, `futures/inverse/btc_usd/cross/*`, `futures/inverse/btc_usd/isolated/trades`) require an authenticated session.

> :warning: **Important:** Your API key, secret and passphrase are sensitive. Treat them like the REST credentials documented above.

```typescript
import { createStreamClient } from '@ln-markets/sdk/stream/v1'

const client = createStreamClient({ network: 'mainnet' })

await client.connect()

const auth = await client.authenticate({
  key: 'your-api-key',
  secret: 'your-api-secret',
  passphrase: 'your-api-key-passphrase',
})
// => { authenticated: true, permissions: ['futures:isolated:read', ...] }

const me = await client.whoami()
// => { apiKey: '...', userId: '...', permissions: [...] }
```

### Subscribe to topics

`subscribe` takes a `Topic[]` and rejects unknown strings at compile time. The `on(topic, callback)` overload narrows the callback's argument type by topic literal — no runtime type assertions needed.

```typescript
import { createStreamClient } from '@ln-markets/sdk/stream/v1'

const client = createStreamClient()
await client.connect()

// Public ticker stream
client.on('futures/inverse/btc_usd/ticker', (data) => {
  // data is FuturesTickerData — typed by topic literal
  console.log(data.time, data.lastPrice, data.funding.rate)
})

// OHLC candles — every resolution from '1m' to '3months' is a valid topic
client.on('futures/inverse/btc_usd/ohlc/1m', (candle) => {
  // candle is OhlcData
  console.log(candle.open, candle.high, candle.low, candle.close, candle.volume)
})

// Private isolated-trade events — discriminated union narrows on `event`
client.on('futures/inverse/btc_usd/isolated/trades', (event) => {
  if (event.event === 'open') {
    console.log('opened trade', event.trade.id, event.trade.price)
  } else if (event.event === 'closed') {
    console.log('closed trade', event.trade.id, event.trade.pl)
  }
})

const result = await client.subscribe({
  topics: [
    'futures/inverse/btc_usd/ticker',
    'futures/inverse/btc_usd/ohlc/1m',
    'futures/inverse/btc_usd/isolated/trades',
  ],
})
// => { subscribed: ['futures/inverse/btc_usd/ticker', ...] }
```

### Lifecycle events

The client emits standard lifecycle events alongside topic events. Listeners are typed.

```typescript
import { createStreamClient } from '@ln-markets/sdk/stream/v1'

const client = createStreamClient()
await client.connect()

client.on('open', () => {
  console.log('connected')
})

client.on('close', (code, reason) => {
  console.log('closed', code, reason)
})

client.on('error', (err) => {
  console.error('stream error', err)
})

client.on('reconnected', ({ attempts }) => {
  console.log('reconnected after', attempts, 'attempts')
  // No auto-resubscribe: replay your subscriptions here.
})
```

### Unsubscribe and close

```typescript
// Unsubscribe from specific topics
await client.unsubscribe({
  topics: ['futures/inverse/btc_usd/ticker'],
})

// Or drop all subscriptions in one call
await client.unsubscribeAll()

// Clean disconnect
client.close()
```

### Available topics

Public:

- `announcements`
- `futures/inverse/btc_usd/ticker`, `.../lastPrice`, `.../index`, `.../buckets`, `.../funding`
- `futures/inverse/btc_usd/ohlc/{1m,3m,5m,10m,15m,30m,45m,1h,2h,3h,4h,1d,1w,1month,3months}`

Private (require `authenticate`):

- `wallet/deposit`, `wallet/withdrawal`
- `futures/inverse/btc_usd/isolated/trades`
- `futures/inverse/btc_usd/cross/orders`, `.../cross/position`

Each topic carries a typed payload (see `SubscriptionData` and the per-topic interfaces exported from `@ln-markets/sdk/stream/v1`).
