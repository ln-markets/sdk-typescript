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
  <a href="https://docs.lnmarkets.com/api/">
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

By default, the SDK will connect to the LN Markets production environment. You can change this by setting the `LNM_API_NETWORK` environment variable to `testnet` or `mainnet` or passing the `network` option to the `createHttpClient` function.

```typescript
import { createHttpClient } from '@ln-markets/sdk'

const client = createHttpClient({
  network: 'testnet',
})
```

### Unauthenticated client

You can use an unauthenticated client to access public endpoints.

```typescript
import { createHttpClient } from '@ln-markets/sdk'

const client = createHttpClient()

await client.futures.getMarketDetails()
```

### Authenticated client

You can authenticate using your API key, secret and passphrase directly passed to the `createHttpClient` function.

You can get your API key, secret and passphrase from the [API Keys section](https://lnmarkets.com/en/user/api) of your LN Markets account.

> :warning: **Important:** Your API key, secret and passphrase are sensitive and should be kept secure. Do not expose them in your client-side code, nor share them with anyone. Any leakage of your API key, secret or passphrase may lead to unauthorized access to your account and irreversible loss of funds.

```typescript
import { createHttpClient } from '@ln-markets/sdk'

const client = createHttpClient({
  key: 'your-api-key',
  secret: 'your-api-secret',
  passphrase: 'your-api-key-passphrase',
})

await client.futures.getTrades({
  type: 'open',
})
```

Alternatively, you can set the environment variables `LNM_API_KEY`, `LNM_API_SECRET` and `LNM_API_PASSPHRASE` to authenticate, which will be used by default if no parameters are provided to the `createHttpClient` function.

## Function List

| Function | Method | Route | Documentation |
| --- | --- | --- | --- |
| futures.addMargin | POST | /futures/add-margin | [Reference](https://docs.lnmarkets.com/api/operations/futuresaddmargin) |
| futures.cancelAllTrades | DELETE | /futures/all/cancel | [Reference](https://docs.lnmarkets.com/api/operations/futurescancelalltrades) |
| futures.cancelTrade | POST | /futures/cancel | [Reference](https://docs.lnmarkets.com/api/operations/futurescanceltrade) |
| futures.cashIn | POST | /futures/cash-in | [Reference](https://docs.lnmarkets.com/api/operations/futurescashin) |
| futures.closeAllTrades | DELETE | /futures/all/close | [Reference](https://docs.lnmarkets.com/api/operations/futuresclosealltrades) |
| futures.closeTrade | DELETE | /futures | [Reference](https://docs.lnmarkets.com/api/operations/futuresclosetrade) |
| futures.getCarryFeesHistory | GET | /futures/carry-fees | [Reference](https://docs.lnmarkets.com/api/operations/futuresgetcarryfees) |
| futures.getFixingHistory | GET | /futures/history/fixing | [Reference](https://docs.lnmarkets.com/api/operations/futuresgetfixinghistory) |
| futures.getIndexHistory | GET | /futures/history/index | [Reference](https://docs.lnmarkets.com/api/operations/futuresgetindexhistory) |
| futures.getLeaderboard | GET | /futures/leaderboard | [Reference](https://docs.lnmarkets.com/api/operations/futuresgetleaderboard) |
| futures.getMarketDetails | GET | /futures/market | [Reference](https://docs.lnmarkets.com/api/operations/futuresgetmarketdetails) |
| futures.getOHLCHistory | GET | /futures/ohlcs | [Reference](https://docs.lnmarkets.com/api/operations/futuresgetohlcs) |
| futures.getPriceHistory | GET | /futures/history/price | [Reference](https://docs.lnmarkets.com/api/operations/futuresgetpricehistory) |
| futures.getTicker | GET | /futures/ticker | [Reference](https://docs.lnmarkets.com/api/operations/futuresgetticker) |
| futures.getTrade | GET | /futures/trades/:id | [Reference](https://docs.lnmarkets.com/api/operations/futuresgettrade) |
| futures.getTrades | GET | /futures | [Reference](https://docs.lnmarkets.com/api/operations/futuresgettrades) |
| futures.newTrade | POST | /futures | [Reference](https://docs.lnmarkets.com/api/operations/futuresnewtrade) |
| futures.updateTrade | PUT | /futures | [Reference](https://docs.lnmarkets.com/api/operations/futuresupdatetrade) |
| notifications.getAllNotifications | GET | /notifications | [Reference](https://docs.lnmarkets.com/api/operations/notificationsfetchnotifications) |
| notifications.markAllAsRead | DELETE | /notifications/all | [Reference](https://docs.lnmarkets.com/api/operations/notificationsmarkallnotificationsasread) |
| options.closeAllTrades | DELETE | /options/all/close | [Reference](https://docs.lnmarkets.com/api/operations/optionsclosealltrades) |
| options.closeTrade | DELETE | /options | [Reference](https://docs.lnmarkets.com/api/operations/optionsclosetrade) |
| options.getInstrument | GET | /options/instrument | [Reference](https://docs.lnmarkets.com/api/operations/optionsgetinstrument) |
| options.getInstruments | GET | /options/instruments | [Reference](https://docs.lnmarkets.com/api/operations/optionsgetinstruments) |
| options.getMarketDetails | GET | /options | [Reference](https://docs.lnmarkets.com/api/operations/optionsgetoptionsmarket) |
| options.getTrade | GET | /options/trades/:id | [Reference](https://docs.lnmarkets.com/api/operations/optionsgettrade) |
| options.getTrades | GET | /options/trades | [Reference](https://docs.lnmarkets.com/api/operations/optionsgettrades) |
| options.newTrade | POST | /options | [Reference](https://docs.lnmarkets.com/api/operations/optionsnewtrade) |
| options.updateTrade | PUT | /options | [Reference](https://docs.lnmarkets.com/api/operations/optionsupdatetrade) |
| oracle.getLastPrice | GET | /oracle/last-price | [Reference](https://docs.lnmarkets.com/api/operations/oraclegetlastprice) |
| swaps.getSwapBySourceId | GET | /swap/source/:sourceId | [Reference](https://docs.lnmarkets.com/api/operations/swapsgetswapbysourceid) |
| swaps.getSwap | GET | /swap/:swapId | [Reference](https://docs.lnmarkets.com/api/operations/swapsgetswap) |
| swaps.getSwaps | GET | /swap | [Reference](https://docs.lnmarkets.com/api/operations/swapsgetswaps) |
| swaps.newSwap | POST | /swap | [Reference](https://docs.lnmarkets.com/api/operations/swapsnewswap) |
| user.depositSyntheticUsd | POST | /user/deposit/susd | [Reference](https://docs.lnmarkets.com/api/operations/userdepositsyntheticusd) |
| user.deposit | POST | /user/deposit | [Reference](https://docs.lnmarkets.com/api/operations/userdeposit) |
| user.getBitcoinAddresses | GET | /user/bitcoin/addresses | [Reference](https://docs.lnmarkets.com/api/operations/usergetbitcoinaddresses) |
| user.getDeposit | GET | /user/deposit/:depositId | [Reference](https://docs.lnmarkets.com/api/operations/usergetdeposit) |
| user.getDeposits | GET | /user/deposit | [Reference](https://docs.lnmarkets.com/api/operations/usergetdeposits) |
| user.getUser | GET | /user | [Reference](https://docs.lnmarkets.com/api/operations/usergetuser) |
| user.getWithdrawal | GET | /user/withdrawals/:id | [Reference](https://docs.lnmarkets.com/api/operations/usergetwithdrawal) |
| user.getWithdrawals | GET | /user/withdraw | [Reference](https://docs.lnmarkets.com/api/operations/usergetwithdrawals) |
| user.newBitcoinAddress | POST | /user/bitcoin/address | [Reference](https://docs.lnmarkets.com/api/operations/usernewbitcoinaddress) |
| user.transfer | POST | /user/transfer | [Reference](https://docs.lnmarkets.com/api/operations/usertransfer) |
| user.updateUser | PUT | /user | [Reference](https://docs.lnmarkets.com/api/operations/userupdate) |
| user.withdrawSyntheticUsd | POST | /user/withdraw/susd | [Reference](https://docs.lnmarkets.com/api/operations/userwithdrawalsyntheticusd) |
| user.withdraw | POST | /user/withdraw | [Reference](https://docs.lnmarkets.com/api/operations/userwithdraw) |
