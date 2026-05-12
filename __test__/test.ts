// oxlint-disable typescript/prefer-readonly-parameter-types -- vitest fixture signatures
import { test as base } from 'vitest'

import type { HttpClient } from '../src/rest/v3/index.js'
import { createHttpClient } from '../src/rest/v3/index.js'
import { authCreds, NETWORK } from './network.js'

// Extended `test` for rest/v3 suites. Injects an unauth `client` (auto-supplied
// To every test) and an `authClient` (resolved lazily; throws with a useful
// Message when creds are absent so tests gated by `skipIf(!HAS_AUTH)` never
// Reach this path).
export const test = base.extend<{
  client: HttpClient
  authClient: HttpClient
}>({
  client: [
    async ({}, use) => {
      const client = createHttpClient({ network: NETWORK })
      await use(client)
    },
    {
      auto: true,
    },
  ],
  authClient: async ({}, use) => {
    const creds = authCreds()
    if (!creds) {
      throw new Error(
        NETWORK === 'testnet4'
          ? 'TESTNET4_API_KEY / TESTNET4_API_KEY_SECRET / TESTNET4_API_KEY_PASSPHRASE required for authenticated rest/v3 tests'
          : 'MAINNET_API_KEY / MAINNET_API_SECRET / MAINNET_API_PASSPHRASE required for authenticated rest/v3 tests'
      )
    }
    const client = createHttpClient({
      network: NETWORK,
      key: creds.key,
      secret: creds.secret,
      passphrase: creds.passphrase,
    })
    await use(client)
  },
})
