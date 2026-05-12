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
import { createUnsubscribeAll } from './methods/unsubscribe-all.js'
import type {
  UnsubscribeAll,
  UnsubscribeAllOutput,
} from './methods/unsubscribe-all.js'
import { createUnsubscribe } from './methods/unsubscribe.js'
import type {
  Unsubscribe,
  UnsubscribeInput,
  UnsubscribeOutput,
} from './methods/unsubscribe.js'
import { createWhoami } from './methods/whoami.js'
import type { Whoami, WhoamiOutput } from './methods/whoami.js'
import type {
  AnnouncementAdd,
  AnnouncementEvent,
  AnnouncementRemove,
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
  public readonly hello: Hello
  public readonly ping: Ping
  public readonly time: Time
  public readonly authenticate: Authenticate
  public readonly whoami: Whoami
  public readonly subscribe: Subscribe
  public readonly unsubscribe: Unsubscribe
  public readonly unsubscribeAll: UnsubscribeAll

  public constructor(options?: Readonly<Options>) {
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
}
