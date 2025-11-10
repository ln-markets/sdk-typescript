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

> ⚠️ **Important:** The v2 API will be deprecated in January 2026. Please migrate to v3 for new projects. See the examples below for v3 usage.

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
import { createHttpClient } from '@ln-markets/sdk/v3'

const client = createHttpClient({
  network: 'testnet', // 'mainnet' or 'testnet'
})
```

### Unauthenticated client

You can use an unauthenticated client to access public endpoints.

```typescript
import { createHttpClient } from '@ln-markets/sdk/v3'

const client = createHttpClient()

// Check server time
const time = await client.time()
// => { time: 1698765432 }

// Ping the server
const pong = await client.ping()
// => { message: 'pong' }

// Get current ticker information
const ticker = await client.futures.getTicket()
// => { index: 67500, lastPrice: 67520, ... }

// Get candles data
const candles = await client.futures.getCandles({
  from: '2023-10-31T00:00:00Z',
  to: '2023-11-01T00:00:00Z',
  interval: '1h',
})

// Get leaderboard
const leaderboard = await client.futures.getLeaderboard()

// Get oracle price data
const lastPrice = await client.oracle.getLastPrice()
const index = await client.oracle.getIndex()
```

### Authenticated client

You can authenticate using your API key, secret and passphrase directly passed to the `createHttpClient` function.

You can get your API key, secret and passphrase from the [API Keys section](https://lnmarkets.com/en/user/api) of your LN Markets account.

> :warning: **Important:** Your API key, secret and passphrase are sensitive and should be kept secure. Do not expose them in your client-side code, nor share them with anyone. Any leakage of your API key, secret or passphrase may lead to unauthorized access to your account and irreversible loss of funds.

```typescript
import { createHttpClient } from '@ln-markets/sdk/v3'

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

### Futures Trading - Isolated Margin

Isolated margin mode allows you to limit the risk to a specific position. Each position has its own margin.

```typescript
import { createHttpClient } from '@ln-markets/sdk/v3'

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
  takeprofit: 72000,
})

// Update stop-loss
await client.futures.isolated.updateStoploss({
  id: 'trade-id',
  stoploss: 66000,
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
import { createHttpClient } from '@ln-markets/sdk/v3'

const client = createHttpClient({
  key: 'your-api-key',
  secret: 'your-api-secret',
  passphrase: 'your-api-key-passphrase',
})

// First, deposit funds into cross margin account
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

// Withdraw funds from cross margin account
await client.futures.cross.withdraw({
  amount: 50000,
})
```

### Account Management

```typescript
import { createHttpClient } from '@ln-markets/sdk/v3'

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
// or add a new one
const newAddress = await client.account.addBitcoinAddress({
  address: 'bc1q...', // Your Bitcoin address
})

// Withdraw on-chain
const onChainWithdrawal = await client.account.withdrawOnChain({
  address: 'bc1q...',
  amount: 100000,
})

// Internal transfer (to another LN Markets user)
const internalTransfer = await client.account.withdrawInternal({
  username: 'recipient-username',
  amount: 50000,
})

// Get transaction histories
const lightningDeposits = await client.account.getLightningDeposits()
const lightningWithdrawals = await client.account.getLightningWithdrawals()
const onChainDeposits = await client.account.getOnChainDeposits()
const onChainWithdrawals = await client.account.getOnChainWithdrawals()
const internalDeposits = await client.account.getInternalDeposits()
const internalWithdrawals = await client.account.getInternalWithdrawals()
```

### Synthetic USD

Synthetic USD allows you to swap between BTC and USD-denominated positions.

```typescript
import { createHttpClient } from '@ln-markets/sdk/v3'

const client = createHttpClient({
  key: 'your-api-key',
  secret: 'your-api-secret',
  passphrase: 'your-api-key-passphrase',
})

// Get best price for swap
const bestPrice = await client.syntheticUsd.getBestPrice({
  side: 'buy', // 'buy' or 'sell'
  quantity: 100, // Amount in USD
})

// Create a new swap
const swap = await client.syntheticUsd.newSwap({
  side: 'buy',
  quantity: 100,
})

// Get swap history
const swaps = await client.syntheticUsd.getSwaps()
```

### Oracle Price Data

```typescript
import { createHttpClient } from '@ln-markets/sdk/v3'

const client = createHttpClient()

// Get latest price
const lastPrice = await client.oracle.getLastPrice()
console.log(`Current BTC price: $${lastPrice.price}`)

// Get index price
const index = await client.oracle.getIndex()
```

## API v3 Features

The v3 API provides the following routes:

- **account**: Account management (balance, info, deposits, withdrawals)
- **futures**: Futures trading (positions, orders, market data)
- **oracle**: Price oracle data
- **syntheticUsd**: Synthetic USD operations
- **time**: Server time
- **ping**: Health check endpoint

### Migrating from v2 to v3

If you're currently using v2, here are the key changes when migrating to v3:

1. **Import path**: Change from `@ln-markets/sdk/v2` to `@ln-markets/sdk/v3`
2. **User route renamed**: The `user` route is now called `account`
3. **New routes**: `syntheticUsd`, `time`, and `ping` are now available
4. **Removed routes**: `notifications`, `options`, and `swaps` have been removed in v3
