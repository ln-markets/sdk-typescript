import type { Options } from './instance.js'

import { createInstance } from './instance.js'
import { createAccountRoute } from './routes/account/index.js'
import { createFuturesRoute } from './routes/futures/index.js'
import { createOracleRoutes } from './routes/oracle/index.js'
import { createPing } from './routes/ping.js'
import { createSyntheticUsdRoutes } from './routes/synthetic-usd/index.js'
import { createTimeRoute } from './routes/time.js'

export const createHttpClient = (options?: Options) => {
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

export type {
  AddBitcoinAddressInput,
  AddBitcoinAddressOutput,
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
  GetOnChainDepositsInput,
  GetOnChainDepositsOutput,
  GetOnChainWithdrawalsInput,
  GetOnChainWithdrawalsOutput,
  WithdrawInternalInput,
  WithdrawInternalOutput,
  WithdrawLightningInput,
  WithdrawLightningOutput,
  WithdrawOnChainInput,
  WithdrawOnChainOutput,
} from './routes/account/index.js'
export type {
  FuturesCrossCancelAllOutput,
  FuturesCrossCancelOrderInput,
  FuturesCrossCancelOutput,
  FuturesCrossCloseOutput,
  FuturesCrossDepositInput,
  FuturesCrossDepositOutput,
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
  FuturesIsolatedGetClosedTradesOutput,
  FuturesIsolatedGetFundingFeesInput,
  FuturesIsolatedGetFundingFeesOutput,
  FuturesIsolatedGetOpenTradesOutput,
  FuturesIsolatedGetRunningTradesOutput,
  FuturesIsolatedNewTradeInput,
  FuturesIsolatedNewTradeOutput,
  FuturesIsolatedUpdateStoplossInput,
  FuturesIsolatedUpdateStoplossOutput,
  FuturesIsolatedUpdateTakeprofitInput,
  FuturesIsolatedUpdateTakeprofitOutput,
  FuturesIsolatedGetClosedTradesInput,
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
  FuturesTrade,
  FuturesTradeSide,
  FuturesTradeStatus,
  FuturesTradeType,
  PaginationInput,
} from './types.js'
