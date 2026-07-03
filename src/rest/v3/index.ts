import type { Options } from './instance.js'
import { createInstance } from './instance.js'
import { createAccountRoute } from './routes/account/index.js'
import { createFuturesRoute } from './routes/futures/index.js'
import { createOracleRoutes } from './routes/oracle/index.js'
import { createPing } from './routes/ping.js'
import { createSyntheticUsdRoutes } from './routes/synthetic-usd/index.js'
import { createTimeRoute } from './routes/time.js'

export const createHttpClient = (options?: Readonly<Options>) => {
  const instance = createInstance({ ...options })

  return {
    account: createAccountRoute(instance),
    futures: createFuturesRoute(instance),
    oracle: createOracleRoutes(instance),
    ping: createPing(instance),
    syntheticUsd: createSyntheticUsdRoutes(instance),
    time: createTimeRoute(instance),
  }
}

export type HttpClient = ReturnType<typeof createHttpClient>

export type { Options } from './instance.js'

export type {
  AddBitcoinAddressInput,
  AddBitcoinAddressOutput,
  BitcoinDeposit,
  DepositLightningInput,
  DepositLightningOutput,
  GetAccountOutput,
  GetBitcoinAddressOutput,
  GetInternalDepositsInput,
  GetInternalDepositsOutput,
  GetInternalWithdrawalsInput,
  GetInternalWithdrawalsOutput,
  GetLightningDepositsInput,
  GetLightningDepositsOutput,
  GetLightningWithdrawalsInput,
  GetLightningWithdrawalsOutput,
  GetNotificationsInput,
  GetNotificationsOutput,
  GetOnChainDepositsInput,
  GetOnChainDepositsOutput,
  GetOnChainWithdrawalsInput,
  GetOnChainWithdrawalsOutput,
  InternalDeposit,
  InternalWithdrawal,
  LightningDeposit,
  LightningWithdrawal,
  Notification,
  OnChainWithdrawal,
  WithdrawInternalInput,
  WithdrawInternalOutput,
  WithdrawLightningInput,
  WithdrawLightningOutput,
  WithdrawOnChainInput,
  WithdrawOnChainOutput,
} from './routes/account/index.js'
export type {
  Candle,
  CandlesResolution,
  FundingSettlement,
  FuturesCrossCancelAllOutput,
  FuturesCrossCancelOrderInput,
  FuturesCrossCancelOutput,
  FuturesCrossCloseOutput,
  FuturesCrossDepositInput,
  FuturesCrossDepositOutput,
  FuturesCrossFilledOrder,
  FuturesCrossGetFilledOrdersInput,
  FuturesCrossGetFilledOrdersOutput,
  FuturesCrossGetFundingFeesInput,
  FuturesCrossGetFundingFeesOutput,
  FuturesCrossGetOpenOrdersOutput,
  FuturesCrossGetPositionOutput,
  FuturesCrossGetTransfersInput,
  FuturesCrossGetTransfersOutput,
  FuturesCrossNewOrderInput,
  FuturesCrossNewOrderOutput,
  FuturesCrossSetLeverageInput,
  FuturesCrossSetLeverageOutput,
  FuturesCrossTransfer,
  FuturesCrossWithdrawInput,
  FuturesCrossWithdrawOutput,
  FuturesIsolatedAddMarginInput,
  FuturesIsolatedAddMarginOutput,
  FuturesIsolatedCancelAllOutput,
  FuturesIsolatedCancelOutput,
  FuturesIsolatedCancelTradeInput,
  FuturesIsolatedCashInInput,
  FuturesIsolatedCashInOutput,
  FuturesIsolatedCloseOutput,
  FuturesIsolatedCloseTradeInput,
  FuturesIsolatedGetClosedTradesInput,
  FuturesIsolatedGetClosedTradesOutput,
  FuturesIsolatedGetFundingFeesInput,
  FuturesIsolatedGetFundingFeesOutput,
  FuturesIsolatedGetOpenTradesOutput,
  FuturesIsolatedGetRunningTradesOutput,
  FuturesIsolatedNewTradeInput,
  FuturesIsolatedNewTradeOutput,
  FuturesIsolatedOrder,
  FuturesIsolatedRemoveStoplossInput,
  FuturesIsolatedRemoveStoplossOutput,
  FuturesIsolatedRemoveTakeprofitInput,
  FuturesIsolatedRemoveTakeprofitOutput,
  FuturesIsolatedUpdateStoplossInput,
  FuturesIsolatedUpdateStoplossOutput,
  FuturesIsolatedUpdateTakeprofitInput,
  FuturesIsolatedUpdateTakeprofitOutput,
  GetCandlesInput,
  GetCandlesOutput,
  GetFundingSettlementsInput,
  GetFundingSettlementsOutput,
  GetLeaderboardOutput,
  GetTickerOutput,
} from './routes/futures/index.js'
export type {
  GetIndexInput,
  GetIndexOutput,
  GetLastPriceInput,
  GetLastPriceOutput,
} from './routes/oracle/index.js'
export type {
  GetBestPriceOutput,
  GetSwapsInput,
  GetSwapsOutput,
  NewSwapInput,
  NewSwapOutput,
  Swap,
} from './routes/synthetic-usd/index.js'
export type { TimeOutput } from './routes/time.js'
export type {
  FundingFees,
  FuturesCanceledTrade,
  FuturesClosedTrade,
  FuturesCrossCanceledOrder,
  FuturesCrossOrder,
  FuturesCrossPosition,
  FuturesOpenOrRunningTrade,
  FuturesOpenTrade,
  FuturesRunningTrade,
  FuturesStoplossMode,
  FuturesTrade,
  FuturesTradeSide,
  FuturesTradeStatus,
  FuturesTradeType,
  PaginatedResponse,
  PaginationInput,
} from './types.js'
