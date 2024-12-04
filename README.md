<p align="center" width="100%">
  <img
    src="./images/logo-gradient.svg"
    style="display:block;margin: 0 auto"
    width=50%
    height=50%
    alt="LN Market's logo"
  />
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@ln-markets/sdk-ts" alt="npm version">
    <img
      alt="NPM Package Version"
      src="https://img.shields.io/npm/v/@ln-markets/sdk-ts"
    />
  </a>
  <a href="https://www.npmjs.com/package/@ln-markets/sdk-ts" alt="npm downloads">
    <img
      alt="NPM Package Downloads"
      src="https://img.shields.io/npm/dw/@ln-markets/sdk-ts"
    />
  </a>
  <a href="https://twitter.com/LNMarkets">
    <img
      src="https://img.shields.io/twitter/follow/LNMarkets?style=social"
      alt="Follow us on X (Twitter)"
    >
  </a>
</p>

<h1 align="center">LN Markets SDK for TypeScript</h1>

<p align="center">
  <a href="https://lnmarkets.com">
    Website
  </a>
  -
  <a href="https://docs.lnmarkets.com/api/">
    API Reference
  </a>
</p>

## Getting Started

### Setup

Install our SDK using your preferred package manager:

```bash
npm install @ln-markets/sdk-ts
```

```bash
pnpm install @ln-markets/sdk-ts
```

```bash
yarn add @ln-markets/sdk-ts
```

```bash
bun add @ln-markets/sdk-ts
```

### Rest API Usage

#### Network

By default, the SDK will connect to the LN Markets production environment. You can change this by setting the `LNM_API_NETWORK` environment variable to `testnet` or `mainnet` or passing the `network` option to the `createRestClient` function.

```typescript
import { createRestClient } from '@ln-markets/sdk-ts'

const client = createRestClient({
  network: 'testnet',
})
```

#### Unauthenticated client

You can use an unauthenticated client to access public endpoints.

```typescript
import { createRestClient } from '@ln-markets/sdk-ts'

const client = createRestClient()

await client.futures.getMarketDetails()
```

#### Authenticated client

You can authenticate using your API key, secret and passphrase directly passed to the `createRestClient` function.

You can get your API key, secret and passphrase from the [API Keys section](https://lnmarkets.com/en/user/api) of your LN Markets account.

**Important:** Your API key, secret and passphrase are sensitive and should be kept secure. Do not expose them in your client-side code, nor share them with anyone. Any leakage of your API key, secret or passphrase may lead to unauthorized access to your account and irreversible loss of funds.

```typescript
import { createRestClient } from '@ln-markets/sdk-ts'

const client = createRestClient({
  key: 'your-api-key',
  secret: 'your-api-secret',
  passphrase: 'your-api-key-passphrase',
})

await client.futures.getTrades({
  type: 'open',
})
```

Alternatively, you can set the environment variables `LNM_API_KEY`, `LNM_API_SECRET` and `LNM_API_PASSPHRASE` to authenticate, which will be used by default if no parameters are provided to the `createRestClient` function.
