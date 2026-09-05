// oxlint-disable typescript/prefer-readonly-parameter-types -- vitest fixture signatures; StreamClient is mutated via .connect()
import { test as base } from 'vitest'

import type { StreamClient } from '../src/stream/v1/index.js'
import { createStreamClient } from '../src/stream/v1/index.js'

import { authCreds, NETWORK } from './network.js'

// Signet hands out periodic 1006 closes during connection storms. Retry the
// Handshake a few times with backoff before giving up the whole suite. Uses
// Recursion instead of a for-loop so each await happens in its own frame and
// Sidesteps `no-await-in-loop` without disables.
const connectWithRetry = async (
  target: StreamClient,
  attempts = 8
): Promise<void> => {
  const attempt = async (i: number): Promise<void> => {
    try {
      await target.connect()
    } catch (error) {
      if (i + 1 >= attempts) {
        throw error
      }
      // Linear backoff up to ~5s on attempt 7.
      await new Promise<void>((resolve) => {
        setTimeout(resolve, 750 * (i + 1))
      })
      await attempt(i + 1)
    }
  }
  await attempt(0)
}

// Server rate-limits to 10 messages/sec per socket. The shared-client design
// Concentrates the entire suite onto one or two sockets, so back-to-back
// Tests trip the limit. A small pause between tests keeps us under the ceiling.
const RATE_LIMIT_PAUSE_MS = 200

// Extended `test` for stream/v1 suites. `client` and `authClient` are
// File-scoped: one WS handshake per fixture for the whole file (signet
// Rate-limits per-IP handshakes, so per-test sockets trigger 1006 closes).
// Fixtures are lazy — a suite gated by `skipIf(!HAS_AUTH)` never opens the
// Auth socket. The auto `pace` fixture clears subscriptions left by each
// Test and spaces tests out below the per-socket message rate limit.
export const test = base.extend<{
  client: StreamClient
  authClient: StreamClient
  pace: null
}>({
  client: [
    async ({}, use) => {
      const c = createStreamClient({
        network: NETWORK,
        reconnectEnabled: false,
      })
      await connectWithRetry(c)
      await use(c)
      c.close()
    },
    { scope: 'file' },
  ],
  authClient: [
    async ({}, use) => {
      const creds = authCreds()
      if (!creds) {
        throw new Error(
          NETWORK === 'signet'
            ? 'SIGNET_API_KEY / SIGNET_API_SECRET / SIGNET_API_PASSPHRASE required for authenticated stream/v1 tests'
            : 'MAINNET_API_KEY / MAINNET_API_SECRET / MAINNET_API_PASSPHRASE required for authenticated stream/v1 tests'
        )
      }
      const c = createStreamClient({
        network: NETWORK,
        reconnectEnabled: false,
      })
      await connectWithRetry(c)
      await c.authenticate(creds)
      await use(c)
      c.close()
    },
    { scope: 'file' },
  ],
  pace: [
    async ({ client }, use) => {
      await use(null)
      // Clear any subscriptions left by the test before the next one runs.
      if (client.state === 'connected') {
        try {
          await client.unsubscribeAll()
        } catch {
          // Ignore; the next test will fail loudly if the socket is dead.
        }
      }
      await new Promise<void>((resolve) => {
        setTimeout(resolve, RATE_LIMIT_PAUSE_MS)
      })
    },
    { auto: true },
  ],
})
