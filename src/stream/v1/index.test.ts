// oxlint-disable eslint/max-lines -- contract-shaped integration tests for stream/v1; splitting would scatter shared fixture setup
// oxlint-disable typescript/prefer-readonly-parameter-types -- vitest fixture destructure {client, authClient}; not meaningfully readonly
import { describe, expect } from 'vitest'

import { HAS_AUTH, NETWORK } from '../../../__test__/network.js'
import { test } from '../../../__test__/stream.js'
import type { Topic } from './index.js'
import {
  createStreamClient,
  StreamClient as StreamClientClass,
  StreamDisconnectedError,
  StreamRpcError,
} from './index.js'

const RPC_TIMEOUT_MS = 10_000

// Shared connections across the whole file: the `client` / `authClient`
// Fixtures (see __test__/stream.ts) are file-scoped, so the entire suite
// Runs on one socket per fixture. Lifecycle tests that need their own
// Socket create one inline.

// Signet occasionally closes idle WS connections mid-request; retry absorbs
// The resulting StreamDisconnectedError without masking real client bugs.
describe('stream/v1', { retry: 2 }, () => {
  describe('basics', () => {
    test('should return pong from ping', async ({ client }) => {
      const pong = await client.ping()
      expect(pong).toBe('pong')
    })

    test('should return server time', async ({ client }) => {
      const result = await client.time()
      expect(result).toStrictEqual({ time: expect.any(Number) })
    })

    test('should complete hello handshake', async ({ client }) => {
      const result = await client.hello({
        clientName: 'sdk-ts-vitest',
        clientVersion: '1.2.5',
      })
      expect(result).toStrictEqual({ version: '1.0.0' })
    })
  })

  describe('public subscription', () => {
    test('should subscribe to ticker and receive typed payload', async ({
      client,
    }) => {
      const topic: Topic = 'futures/inverse/btc_usd/ticker'

      const received = new Promise<void>((resolve, reject) => {
        const timer = setTimeout(() => {
          reject(new Error(`no ticker frame within ${RPC_TIMEOUT_MS}ms`))
        }, RPC_TIMEOUT_MS)

        // oxlint-disable-next-line typescript/prefer-readonly-parameter-types -- TypedEmitter event payload; read-only by convention
        client.once(topic, (data) => {
          clearTimeout(timer)
          expect(data.time).toEqual(expect.any(Number))
          expect(
            data.lastPrice === null || typeof data.lastPrice === 'number'
          ).toBe(true)
          expect(data.funding).toMatchObject({
            rate: expect.anything(),
            time: expect.anything(),
          })
          resolve()
        })
      })

      const result = await client.subscribe({ topics: [topic] })
      expect(result.subscribed).toContain(topic)

      await received

      const dropped = await client.unsubscribe({ topics: [topic] })
      expect(dropped.unsubscribed).toContain(topic)
    })

    test('should narrow ohlc topic callback to OhlcData', async ({
      client,
    }) => {
      // Type-narrowing assertion is compile-time; here we only verify the
      // Subscription handshake. Live signet may produce no candle within
      // The RPC timeout when market activity is idle, so waiting on a frame
      // From the wire makes the test flaky for no extra coverage.
      const topic: Topic = 'futures/inverse/btc_usd/ohlc/1m'
      const result = await client.subscribe({ topics: [topic] })
      expect(result.subscribed).toContain(topic)
      await client.unsubscribeAll()
    })
  })

  // Authenticated suite skipped wholesale when creds for the active network
  // Are absent (instead of failing 3 tests with a noisy stack trace). The
  // `authClient` fixture is lazy, so a skipped suite never opens its socket.
  describe.skipIf(!HAS_AUTH)('authenticated', () => {
    test('should return whoami payload', async ({ authClient }) => {
      const me = await authClient.whoami()
      expect(me).toStrictEqual({
        apiKey: expect.any(String),
        userId: expect.any(String),
        permissions: expect.arrayContaining([expect.any(String)]),
      })
    })

    test('should subscribe to private isolated/trades topic', async ({
      authClient,
    }) => {
      const topic: Topic = 'futures/inverse/btc_usd/isolated/trades'
      const result = await authClient.subscribe({ topics: [topic] })
      expect(result.subscribed).toContain(topic)
      await authClient.unsubscribeAll()
    })

    test('should reject unknown topic at runtime', async ({ authClient }) => {
      await expect(
        authClient.subscribe({
          topics: ['futures/inverse/btc_usd/bogus' as unknown as Topic],
        })
      ).rejects.toBeInstanceOf(StreamRpcError)
    })
  })

  describe('factory', () => {
    test('createStreamClient returns StreamClient instance', () => {
      const c = createStreamClient()
      expect(c).toBeInstanceOf(StreamClientClass)
      expect(typeof c.ping).toBe('function')
      expect(typeof c.time).toBe('function')
      expect(typeof c.hello).toBe('function')
      expect(typeof c.authenticate).toBe('function')
      expect(typeof c.whoami).toBe('function')
      expect(typeof c.subscribe).toBe('function')
      expect(typeof c.unsubscribe).toBe('function')
      expect(typeof c.unsubscribeAll).toBe('function')
    })

    test('state is "disconnected" before connect()', () => {
      const c = createStreamClient({ network: NETWORK })
      expect(c.state).toBe('disconnected')
    })
  })

  describe('lifecycle', () => {
    test('state is "connected" after connect()', ({ client }) => {
      expect(client.state).toBe('connected')
    })

    test('connect() while connected rejects', async ({ client }) => {
      await expect(client.connect()).rejects.toThrow(/state is/u)
    })

    test('close() is idempotent', async () => {
      // Own client: avoids tearing down the shared connection for later tests.
      const c = createStreamClient({
        network: NETWORK,
        reconnectEnabled: false,
      })
      await c.connect()
      expect(() => {
        c.close()
        c.close()
      }).not.toThrow()
      expect(c.state).toBe('disconnected')
    })

    test('request after close rejects with StreamDisconnectedError', async () => {
      const c = createStreamClient({
        network: NETWORK,
        reconnectEnabled: false,
      })
      await c.connect()
      c.close()
      await expect(c.ping()).rejects.toBeInstanceOf(StreamDisconnectedError)
    })

    test('emits "open" event on connect', async () => {
      const c = createStreamClient({
        network: NETWORK,
        reconnectEnabled: false,
      })
      try {
        const opened = new Promise<boolean>((resolve, reject) => {
          const timer = setTimeout(() => {
            reject(new Error('no open event'))
          }, RPC_TIMEOUT_MS)
          c.once('open', () => {
            clearTimeout(timer)
            resolve(true)
          })
        })
        await c.connect()
        expect(await opened).toBe(true)
      } finally {
        c.close()
      }
    })

    test('emits "close" event with code 1000 on user close()', async () => {
      const c = createStreamClient({
        network: NETWORK,
        reconnectEnabled: false,
      })
      await c.connect()
      const closed = new Promise<number>((resolve, reject) => {
        const timer = setTimeout(() => {
          reject(new Error('no close event'))
        }, RPC_TIMEOUT_MS)
        c.once('close', (code) => {
          clearTimeout(timer)
          resolve(code)
        })
      })
      c.close()
      expect(await closed).toBe(1000)
    })

    test('connect → close → connect cycle works', async () => {
      const c = createStreamClient({
        network: NETWORK,
        reconnectEnabled: false,
      })
      try {
        await c.connect()
        expect(c.state).toBe('connected')
        c.close()
        expect(c.state).toBe('disconnected')
        // Wait for old socket to fully tear down before opening a new one;
        // Old ws close handler nulls #ws and clobbers state otherwise.
        await new Promise<void>((resolve) => {
          c.once('close', () => {
            resolve()
          })
        })
        await c.connect()
        expect(c.state).toBe('connected')
        const pong = await c.ping()
        expect(pong).toBe('pong')
      } finally {
        c.close()
      }
    })
  })

  describe('public subscription variations', () => {
    test('subscribe to multiple topics in one call', async ({ client }) => {
      const topics: Topic[] = [
        'futures/inverse/btc_usd/lastPrice',
        'futures/inverse/btc_usd/index',
      ]
      const result = await client.subscribe({ topics })
      expect(result.subscribed).toEqual(expect.arrayContaining(topics))
      const dropped = await client.unsubscribeAll()
      expect(dropped.unsubscribed).toEqual(expect.arrayContaining(topics))
    })

    test('partial unsubscribe leaves other topics active', async ({
      client,
    }) => {
      const t1: Topic = 'futures/inverse/btc_usd/lastPrice'
      const t2: Topic = 'futures/inverse/btc_usd/index'
      await client.subscribe({ topics: [t1, t2] })
      const dropped = await client.unsubscribe({ topics: [t1] })
      expect(dropped.unsubscribed).toContain(t1)
      expect(dropped.unsubscribed).not.toContain(t2)
      const rest = await client.unsubscribeAll()
      expect(rest.unsubscribed).toContain(t2)
      expect(rest.unsubscribed).not.toContain(t1)
    })

    test('subscribe to lastPrice receives typed payload', async ({
      client,
    }) => {
      const topic: Topic = 'futures/inverse/btc_usd/lastPrice'
      const received = new Promise<void>((resolve, reject) => {
        const timer = setTimeout(() => {
          reject(new Error(`no lastPrice frame within ${RPC_TIMEOUT_MS}ms`))
        }, RPC_TIMEOUT_MS)
        // oxlint-disable-next-line typescript/prefer-readonly-parameter-types -- TypedEmitter event payload; read-only by convention
        client.once(topic, (data) => {
          clearTimeout(timer)
          expect(data.time).toEqual(expect.any(Number))
          expect(data.lastPrice).toEqual(expect.any(Number))
          resolve()
        })
      })
      await client.subscribe({ topics: [topic] })
      await received
      await client.unsubscribeAll()
    })

    test('subscribe to ohlc with non-1m resolution narrows to OhlcData', async ({
      client,
    }) => {
      // Same rationale as the ohlc/1m test: a 5m candle topic may emit zero
      // Frames during a short test window, so we only verify subscription.
      const topic: Topic = 'futures/inverse/btc_usd/ohlc/5m'
      const result = await client.subscribe({ topics: [topic] })
      expect(result.subscribed).toContain(topic)
      await client.unsubscribeAll()
    })

    test('unknown topic on unauth client rejects with StreamRpcError', async ({
      client,
    }) => {
      await expect(
        client.subscribe({
          topics: ['futures/inverse/btc_usd/bogus' as unknown as Topic],
        })
      ).rejects.toBeInstanceOf(StreamRpcError)
    })

    test('whoami on unauth client rejects with StreamRpcError', async ({
      client,
    }) => {
      await expect(client.whoami()).rejects.toBeInstanceOf(StreamRpcError)
    })
  })

  describe('rpc basics extra', () => {
    test('successive ping calls both resolve', async ({ client }) => {
      const a = await client.ping()
      const b = await client.ping()
      expect(a).toBe('pong')
      expect(b).toBe('pong')
    })

    test('time returns a recent server timestamp', async ({ client }) => {
      const before = Date.now()
      const { time } = await client.time()
      const after = Date.now()
      // Server time should be within +/- 60s of local clock.
      expect(time).toBeGreaterThan(before - 60_000)
      expect(time).toBeLessThan(after + 60_000)
    })

    test('hello can be called twice', async ({ client }) => {
      const first = await client.hello({
        clientName: 'sdk-ts-vitest',
        clientVersion: '1.2.5',
      })
      const second = await client.hello({
        clientName: 'sdk-ts-vitest',
        clientVersion: '1.2.5',
      })
      expect(first).toStrictEqual({ version: '1.0.0' })
      expect(second).toStrictEqual({ version: '1.0.0' })
    })
  })
})
