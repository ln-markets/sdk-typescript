// Phase 3 public surface — createStreamClient factory + StreamClient class + method I/O type re-exports atop the Phase 2 transport barrel.

import type { Options } from './types.js'

import { StreamClient } from './client.js'

export type { Options, StreamEvents } from './types.js'

export {
  ReconnectFailedError,
  StreamDisconnectedError,
  StreamRequestTimeoutError,
  StreamRpcError,
} from './errors.js'

export { StreamInstance } from './instance.js'

export { StreamClient } from './client.js'

export type {
  AnnouncementAdd,
  AnnouncementEvent,
  AnnouncementRemove,
  Authenticate,
  AuthenticateInput,
  AuthenticateOutput,
  CrossOrderCanceled,
  CrossOrderEvent,
  CrossOrderLimit,
  CrossOrderNew,
  CrossPositionData,
  FuturesBucketData,
  FuturesFundingData,
  FuturesIndexData,
  FuturesLastPriceData,
  FuturesTickerData,
  Hello,
  HelloInput,
  HelloOutput,
  Instrument,
  IsolatedTradeCanceled,
  IsolatedTradeClosed,
  IsolatedTradeFilled,
  IsolatedTradeFunding,
  IsolatedTradeLiquidation,
  IsolatedTradeOpen,
  IsolatedTradesEvent,
  IsolatedTradeStoploss,
  IsolatedTradeTakeprofit,
  MarginMode,
  OhlcData,
  OhlcResolution,
  OhlcTopic,
  Pair,
  Ping,
  PingOutput,
  Subscribe,
  SubscribeInput,
  SubscribeOutput,
  SubscriptionData,
  Time,
  TimeOutput,
  Topic,
  Unsubscribe,
  UnsubscribeAll,
  UnsubscribeAllOutput,
  UnsubscribeInput,
  UnsubscribeOutput,
  WalletDepositData,
  WalletWithdrawData,
  Whoami,
  WhoamiOutput,
} from './client.js'

// D-33: trivial factory — `new StreamClient(options)`. Caller uses
// `client.connect()`, `client.on('open', …)`, `client.hello({...})`, etc.
export const createStreamClient = (options?: Options): StreamClient =>
  new StreamClient(options)
