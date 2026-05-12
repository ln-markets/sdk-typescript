import { StreamInstance } from './instance.js'
import { createAuthenticate } from './methods/authenticate.js'
import type {
  Authenticate,
  AuthenticateInput,
  AuthenticateOutput,
} from './methods/authenticate.js'
import { createHello } from './methods/hello.js'
import type { Hello, HelloInput, HelloOutput } from './methods/hello.js'
import { createPing } from './methods/ping.js'
import type { Ping, PingOutput } from './methods/ping.js'
import { createSubscribe } from './methods/subscribe.js'
import type {
  Subscribe,
  SubscribeInput,
  SubscribeOutput,
} from './methods/subscribe.js'
import { createTime } from './methods/time.js'
import type { Time, TimeOutput } from './methods/time.js'
import { createUnsubscribe } from './methods/unsubscribe.js'
import type {
  Unsubscribe,
  UnsubscribeInput,
  UnsubscribeOutput,
} from './methods/unsubscribe.js'
import { createUnsubscribeAll } from './methods/unsubscribe-all.js'
import type {
  UnsubscribeAll,
  UnsubscribeAllOutput,
} from './methods/unsubscribe-all.js'
import { createWhoami } from './methods/whoami.js'
import type { Whoami, WhoamiOutput } from './methods/whoami.js'
import type {
  AnnouncementAdd,
  AnnouncementEvent,
  AnnouncementRemove,
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
  Options,
  Pair,
  SubscriptionData,
  Topic,
  WalletDepositData,
  WalletWithdrawData,
} from './types.js'

export class StreamClient extends StreamInstance {
  readonly hello: Hello
  readonly ping: Ping
  readonly time: Time
  readonly authenticate: Authenticate
  readonly whoami: Whoami
  readonly subscribe: Subscribe
  readonly unsubscribe: Unsubscribe
  readonly unsubscribeAll: UnsubscribeAll

  constructor(options?: Options) {
    super(options)
    this.hello = createHello(this)
    this.ping = createPing(this)
    this.time = createTime(this)
    this.authenticate = createAuthenticate(this)
    this.whoami = createWhoami(this)
    this.subscribe = createSubscribe(this)
    this.unsubscribe = createUnsubscribe(this)
    this.unsubscribeAll = createUnsubscribeAll(this)
  }
}

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
}
