import { StreamInstance } from './instance.js'
import { createAuthenticate } from './methods/authenticate.js'
import type { Authenticate } from './methods/authenticate.js'
import { createHello } from './methods/hello.js'
import type { Hello } from './methods/hello.js'
import { createPing } from './methods/ping.js'
import type { Ping } from './methods/ping.js'
import { createSubscribe } from './methods/subscribe.js'
import type { Subscribe } from './methods/subscribe.js'
import { createTime } from './methods/time.js'
import type { Time } from './methods/time.js'
import { createUnsubscribeAll } from './methods/unsubscribe-all.js'
import type { UnsubscribeAll } from './methods/unsubscribe-all.js'
import { createUnsubscribe } from './methods/unsubscribe.js'
import type { Unsubscribe } from './methods/unsubscribe.js'
import { createWhoami } from './methods/whoami.js'
import type { Whoami } from './methods/whoami.js'
import type { Options } from './types.js'

export type {
  AuthenticateInput,
  AuthenticateOutput,
} from './methods/authenticate.js'
export type { HelloInput, HelloOutput } from './methods/hello.js'
export type { PingOutput } from './methods/ping.js'
export type { SubscribeInput, SubscribeOutput } from './methods/subscribe.js'
export type { TimeOutput } from './methods/time.js'
export type { UnsubscribeAllOutput } from './methods/unsubscribe-all.js'
export type {
  UnsubscribeInput,
  UnsubscribeOutput,
} from './methods/unsubscribe.js'
export type { WhoamiOutput } from './methods/whoami.js'
export type {
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
