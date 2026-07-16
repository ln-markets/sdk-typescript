/**
 * Runnable example of stream/v1 — exercises every public RPC + every topic listener.
 *
 * RPC methods covered: hello, ping, time, authenticate, whoami,
 *                      subscribe, unsubscribe, unsubscribeAll.
 *
 * Run (public-only, testnet4):
 *   pnpm exec tsx examples/stream-v1.ts
 *
 * Authenticated run reads creds by network:
 *   mainnet  → MAINNET_API_KEY, MAINNET_API_KEY_SECRET, MAINNET_API_KEY_PASSPHRASE
 *   testnet4 → TESTNET4_API_KEY, TESTNET4_API_KEY_SECRET, TESTNET4_API_KEY_PASSPHRASE
 *
 * tsx does not auto-load .env, so source it first:
 *   set -a; source .env; set +a
 *   pnpm exec tsx examples/stream-v1.ts --auth
 *
 * Defaults to testnet4. Pass --mainnet to opt in:
 *   pnpm exec tsx examples/stream-v1.ts --mainnet
 *   pnpm exec tsx examples/stream-v1.ts --mainnet --auth
 */

import { createStreamClient } from '../src/stream/v1/index.js'

const network = process.argv.includes('--mainnet') ? 'mainnet' : 'testnet4'
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
          'MAINNET_API_KEY_SECRET',
          'MAINNET_API_KEY_PASSPHRASE',
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

if (wantAuth) {
  resolveCreds(network)
}

const client = createStreamClient({
  network,
  reconnectInterval: 5000,
  reconnectEnabled: true,
  maxReconnectAttempts: 5,
})

// ---------------------------------------------------------------------------
// Lifecycle listeners
// ---------------------------------------------------------------------------

client.on('open', () => {
  console.log(`[open] connected to ${network}`)
})

client.on('close', (code, reason) => {
  console.log(`[close] code=${code} reason=${reason || '(empty)'}`)
})

client.on('error', (err) => {
  console.error(`[error] ${err.message}`)
})

client.on('reconnected', ({ attempts }) => {
  console.log(
    `[reconnected] after ${attempts} attempt(s) — replay subscriptions here`
  )
})

// ---------------------------------------------------------------------------
// Public topic listeners
// ---------------------------------------------------------------------------

client.on('announcements', (event) => {
  if ('title' in event) {
    console.log(`[announcements] ADD id=${event.id} title=${event.title}`)
  } else {
    console.log(`[announcements] REMOVE id=${event.id}`)
  }
})

client.on('futures/inverse/btc_usd/ticker', (data) => {
  console.log(
    `[ticker] time=${data.time} lastPrice=${data.lastPrice} fundingRate=${data.funding.rate}`
  )
})

client.on('futures/inverse/btc_usd/lastPrice', (data) => {
  console.log(`[lastPrice] time=${data.time} lastPrice=${data.lastPrice}`)
})

client.on('futures/inverse/btc_usd/index', (data) => {
  console.log(`[index] time=${data.time} index=${data.index}`)
})

client.on('futures/inverse/btc_usd/buckets', (data) => {
  console.log(`[buckets] time=${data.time} count=${data.buckets.length}`)
})

client.on('futures/inverse/btc_usd/funding', (data) => {
  console.log(
    `[funding] pair=${data.pair} rate=${data.current.rate} time=${data.current.time}`
  )
})

client.on('futures/inverse/btc_usd/ohlc/1m', (candle) => {
  console.log(
    `[ohlc/1m] o=${candle.open} h=${candle.high} l=${candle.low} c=${candle.close} v=${candle.volume}`
  )
})

client.on('futures/inverse/btc_usd/ohlc/5m', (candle) => {
  console.log(
    `[ohlc/5m] o=${candle.open} h=${candle.high} l=${candle.low} c=${candle.close} v=${candle.volume}`
  )
})

// ---------------------------------------------------------------------------
// Private topic listeners (only useful when authenticated)
// ---------------------------------------------------------------------------

if (wantAuth) {
  client.on('wallet/deposit', (deposit) => {
    console.log(
      `[wallet/deposit] id=${deposit.id} amount=${deposit.amount} status=${deposit.status} network=${deposit.network}`
    )
  })

  client.on('wallet/withdrawal', (withdrawal) => {
    console.log(
      `[wallet/withdrawal] id=${withdrawal.id} amount=${withdrawal.amount} fee=${withdrawal.fee} status=${withdrawal.status}`
    )
  })

  client.on('futures/inverse/btc_usd/isolated/trades', (event) => {
    // Discriminated union: `event.event` narrows `event.trade` shape per variant.
    if (event.event === 'open' || event.event === 'filled') {
      console.log(
        `[isolated/trades] ${event.event.toUpperCase()} id=${event.trade.id} price=${event.trade.price}`
      )
    } else if (event.event === 'canceled') {
      console.log(`[isolated/trades] CANCELED id=${event.trade.id}`)
    } else if (event.event === 'liquidation') {
      console.log(
        `[isolated/trades] LIQUIDATION id=${event.trade.id} exitPrice=${event.trade.exitPrice}`
      )
    } else if (event.event === 'funding') {
      console.log(
        `[isolated/trades] FUNDING id=${event.trade.id} fundingFee=${event.trade.fundingFee}`
      )
    } else {
      // Closed | stoploss | takeprofit — same trade shape with pl + exitPrice
      console.log(
        `[isolated/trades] ${event.event.toUpperCase()} id=${event.trade.id} pl=${event.trade.pl} exitPrice=${event.trade.exitPrice}`
      )
    }
  })

  client.on('futures/inverse/btc_usd/cross/orders', (event) => {
    console.log(
      `[cross/orders] event=${event.event} id=${event.order.id} side=${event.order.side} price=${event.order.price}`
    )
  })

  client.on('futures/inverse/btc_usd/cross/position', (event) => {
    console.log(
      `[cross/position] event=${event.event} qty=${event.position.quantity} margin=${event.position.margin} pl=${event.position.totalPl}`
    )
  })
}

// ---------------------------------------------------------------------------
// Connect + exercise every RPC method
// ---------------------------------------------------------------------------

// Server rate-limits to 10 messages/sec per socket. Pace RPCs with a small
// Sleep so back-to-back calls (hello → ping → time → authenticate → whoami →
// Subscribe → unsubscribe) stay comfortably under the ceiling.
const RPC_PACE_MS = 150
const sleep = async (ms: number): Promise<void> =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, ms)
  })

await client.connect()

const hello = await client.hello({
  clientName: 'sdk-ts-example',
  clientVersion: '0.0.0',
})
console.log(`[rpc] hello → version=${hello.version}`)
await sleep(RPC_PACE_MS)

const ping = await client.ping()
console.log(`[rpc] ping → ${ping}`)
await sleep(RPC_PACE_MS)

const time = await client.time()
console.log(`[rpc] time → ${time.time}`)
await sleep(RPC_PACE_MS)

const publicTopics = [
  'announcements',
  'futures/inverse/btc_usd/ticker',
  'futures/inverse/btc_usd/lastPrice',
  'futures/inverse/btc_usd/index',
  'futures/inverse/btc_usd/buckets',
  'futures/inverse/btc_usd/funding',
  'futures/inverse/btc_usd/ohlc/1m',
  'futures/inverse/btc_usd/ohlc/5m',
] as const

let dropped: { unsubscribed: readonly string[] }
if (wantAuth) {
  const auth = await client.authenticate(resolveCreds(network))
  console.log(
    `[rpc] authenticate → authenticated=${auth.authenticated} permissions=${auth.permissions.length}`
  )
  await sleep(RPC_PACE_MS)

  const me = await client.whoami()
  console.log(`[rpc] whoami → apiKey=${me.apiKey} userId=${me.userId}`)
  await sleep(RPC_PACE_MS)

  const subscribed = await client.subscribe({
    topics: [
      ...publicTopics,
      'wallet/deposit',
      'wallet/withdrawal',
      'futures/inverse/btc_usd/isolated/trades',
      'futures/inverse/btc_usd/cross/orders',
      'futures/inverse/btc_usd/cross/position',
    ],
  })
  console.log(`[rpc] subscribe → ${subscribed.subscribed.join(', ')}`)
  await sleep(RPC_PACE_MS)

  // Demo single-topic unsubscribe — drop announcements only, rest keep streaming.
  dropped = await client.unsubscribe({ topics: ['announcements'] })
} else {
  const subscribed = await client.subscribe({ topics: [...publicTopics] })
  console.log(`[rpc] subscribe → ${subscribed.subscribed.join(', ')}`)
  await sleep(RPC_PACE_MS)

  // Demo single-topic unsubscribe on public stream too.
  dropped = await client.unsubscribe({
    topics: ['futures/inverse/btc_usd/ohlc/5m'],
  })
}
console.log(`[rpc] unsubscribe → ${dropped.unsubscribed.join(', ')}`)

const RUN_MS = 30_000
console.log(`[run] streaming for ${RUN_MS}ms — Ctrl+C to stop early`)

const shutdown = async (reason: string): Promise<void> => {
  console.log(`[shutdown] ${reason}`)
  try {
    const all = await client.unsubscribeAll()
    console.log(`[rpc] unsubscribeAll → ${all.unsubscribed.length} topic(s)`)
  } catch (error) {
    console.error(
      `[shutdown] unsubscribeAll failed: ${(error as Error).message}`
    )
  }
  client.close()
}

process.on('SIGINT', () => {
  void shutdown('SIGINT').then(() => process.exit(0))
})

setTimeout(() => {
  void shutdown('timeout').then(() => process.exit(0))
}, RUN_MS)
