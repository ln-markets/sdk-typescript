import { EventEmitter } from 'node:events'

import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

// oxlint-disable-next-line unicorn/prefer-event-target -- mirrors the Node `ws` library's EventEmitter API; StreamInstance calls .on/.once
class MockWebSocket extends EventEmitter {
  public static instances: MockWebSocket[] = []

  public readonly url: string

  public send = vi.fn<(payload: string) => void>()

  public close = vi.fn((code?: number): void => {
    setImmediate(() => {
      this.emit('close', code ?? 1000, Buffer.from(''))
    })
  })

  public constructor(url: string) {
    super()
    this.url = url
    MockWebSocket.instances.push(this)
  }
}

vi.mock('ws', () => ({ default: MockWebSocket }))

// Import StreamInstance AFTER the mock is registered so its
// `import WebSocket from 'ws'` resolves to MockWebSocket.
const { StreamInstance } = await import('./instance.js')

const tick = async (): Promise<void> => {
  await new Promise<void>((resolve) => {
    setImmediate(resolve)
  })
}

const latestSocket = (): MockWebSocket => {
  const last = MockWebSocket.instances.length - 1
  if (last < 0) {
    throw new Error('no MockWebSocket constructed')
  }
  // oxlint-disable-next-line typescript/no-non-null-assertion -- bounds checked above
  return MockWebSocket.instances[last]!
}

beforeEach(() => {
  MockWebSocket.instances.length = 0
})

afterEach(() => {
  MockWebSocket.instances.length = 0
})

describe('StreamInstance pre-open close contract', () => {
  test('initial connect() rejects on pre-open close and does NOT auto-reconnect', async () => {
    const c = new StreamInstance({
      reconnectEnabled: true,
      reconnectInterval: 20,
      maxReconnectAttempts: 5,
    })
    const connectPromise = c.connect()
    await tick()
    const ws = latestSocket()

    // Pre-open close (e.g. ws emits 'close' before 'open' on DNS/TLS failure).
    ws.emit('close', 1006, Buffer.from('handshake failed'))

    await expect(connectPromise).rejects.toThrow(/closed before open/u)
    expect(c.state).toBe('disconnected')

    // No background reconnect should fire after rejection. Wait > reconnectInterval.
    await new Promise<void>((resolve) => {
      setTimeout(resolve, 60)
    })
    expect(MockWebSocket.instances).toHaveLength(1)
    expect(c.state).toBe('disconnected')
  })

  test('caller can retry connect() after initial pre-open failure', async () => {
    const c = new StreamInstance({
      reconnectEnabled: true,
      reconnectInterval: 20,
    })
    const first = c.connect()
    await tick()
    latestSocket().emit('close', 1006, Buffer.from(''))
    await expect(first).rejects.toThrow(/closed before open/u)

    // State must be 'disconnected' (not 'reconnecting') so retry is allowed.
    expect(c.state).toBe('disconnected')

    const second = c.connect()
    await tick()
    // New socket constructed for the retry.
    expect(MockWebSocket.instances).toHaveLength(2)
    const ws2 = latestSocket()
    ws2.emit('open')
    await expect(second).resolves.toBeUndefined()
    expect(c.state).toBe('connected')
  })

  test('mid-cycle reconnect attempt that fails pre-open still schedules next retry', async () => {
    const c = new StreamInstance({
      reconnectEnabled: true,
      reconnectInterval: 20,
      maxReconnectAttempts: 3,
    })
    try {
      const connectPromise = c.connect()
      await tick()
      const ws1 = latestSocket()

      // Successful open → caller's connect() resolves.
      ws1.emit('open')
      await connectPromise
      expect(c.state).toBe('connected')

      // Server drops connection (non-1000) → triggers reconnect schedule
      // Synchronously, so state moves disconnected → reconnecting in one tick.
      ws1.emit('close', 1006, Buffer.from('server gone'))
      expect(c.state).toBe('reconnecting')

      // Wait for first reconnect attempt to construct ws2.
      await new Promise<void>((resolve) => {
        setTimeout(resolve, 40)
      })
      expect(MockWebSocket.instances).toHaveLength(2)
      const ws2 = latestSocket()

      // Reconnect attempt #1 also fails pre-open → next retry MUST still schedule.
      ws2.emit('close', 1006, Buffer.from(''))
      expect(c.state).toBe('reconnecting')

      await new Promise<void>((resolve) => {
        setTimeout(resolve, 40)
      })
      expect(MockWebSocket.instances).toHaveLength(3)
    } finally {
      // Always cancel pending reconnect timer so it cannot fire after the
      // Test ends and pollute MockWebSocket.instances for later tests.
      c.close()
    }
  })

  test('initial pre-open close with reconnectEnabled: false also rejects cleanly', async () => {
    const c = new StreamInstance({ reconnectEnabled: false })
    const connectPromise = c.connect()
    await tick()
    latestSocket().emit('close', 1006, Buffer.from(''))
    await expect(connectPromise).rejects.toThrow(/closed before open/u)
    expect(c.state).toBe('disconnected')
    await new Promise<void>((resolve) => {
      setTimeout(resolve, 30)
    })
    expect(MockWebSocket.instances).toHaveLength(1)
  })
})
