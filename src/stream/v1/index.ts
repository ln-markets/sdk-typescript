// Phase 3 public surface — createStreamClient factory + StreamClient class + method I/O type re-exports atop the Phase 2 transport barrel.

import { StreamClient } from './client.js'
import type { Options } from './types.js'

export type { Options, StreamEvents } from './types.js'

export {
  ReconnectFailedError,
  StreamDisconnectedError,
  StreamRequestTimeoutError,
  StreamRpcError,
} from './errors.js'

export { StreamInstance } from './instance.js'
export type { ConnectionState } from './instance.js'

export { StreamClient } from './client.js'

export type {
  AnnouncementAdd,
  AnnouncementEvent,
  AnnouncementRemove,
  AuthenticateInput,
  AuthenticateOutput,
  CrossOrderCanceled,
  CrossOrderCanceledPayload,
  CrossOrderEvent,
  CrossOrderFilledPayload,
  CrossOrderLimit,
  CrossOrderNew,
  CrossOrderOpenPayload,
  CrossPositionData,
  FuturesBucketData,
  FuturesFundingData,
  FuturesIndexData,
  FuturesLastPriceData,
  FuturesTickerData,
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
  PingOutput,
  SubscribeInput,
  SubscribeOutput,
  SubscriptionData,
  TimeOutput,
  Topic,
  UnsubscribeAllOutput,
  UnsubscribeInput,
  UnsubscribeOutput,
  WalletDepositData,
  WalletWithdrawData,
  WhoamiOutput,
} from './client.js'

// D-33: trivial factory — `new StreamClient(options)`. Caller uses
// `client.connect()`, `client.on('open', …)`, `client.hello({...})`, etc.
export const createStreamClient = (options?: Readonly<Options>): StreamClient =>
  new StreamClient(options)
