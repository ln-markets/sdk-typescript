import type { KyInstance } from 'ky'

import { createCancelAll } from './cancel-all.js'
import { createCancel } from './cancel.js'
import { createClose } from './close.js'
import { createDeposit } from './deposit.js'
import { createGetFilledOrders } from './get-filled-orders.js'
import { createGetFundingFees } from './get-funding-fees.js'
import { createGetOpenOrders } from './get-open-orders.js'
import { createGetPosition } from './get-position.js'
import { createGetTransfers } from './get-transfers.js'
import { createNewOrder } from './new-order.js'
import { createSetLeverage } from './set-leverage.js'
import { createWithdraw } from './withdraw.js'

export type { FuturesCrossCancelAllOutput } from './cancel-all.js'
export type {
  FuturesCrossCancelOrderInput,
  FuturesCrossCancelOutput,
} from './cancel.js'
export type { FuturesCrossCloseOutput } from './close.js'
export type {
  FuturesCrossDepositInput,
  FuturesCrossDepositOutput,
} from './deposit.js'
export type {
  FuturesCrossGetFilledOrdersInput,
  FuturesCrossGetFilledOrdersOutput,
} from './get-filled-orders.js'
export type {
  FuturesCrossGetFundingFeesInput,
  FuturesCrossGetFundingFeesOutput,
} from './get-funding-fees.js'
export type { FuturesCrossGetOpenOrdersOutput } from './get-open-orders.js'
export type { FuturesCrossGetPositionOutput } from './get-position.js'
export type {
  FuturesCrossGetTransfersInput,
  FuturesCrossGetTransfersOutput,
} from './get-transfers.js'
export type {
  FuturesCrossNewOrderInput,
  FuturesCrossNewOrderOutput,
} from './new-order.js'
export type {
  FuturesCrossSetLeverageInput,
  FuturesCrossSetLeverageOutput,
} from './set-leverage.js'
export type {
  FuturesCrossWithdrawInput,
  FuturesCrossWithdrawOutput,
} from './withdraw.js'

export const createFuturesCrossRoute = (instance: KyInstance) => {
  return {
    cancel: createCancel(instance),
    cancelAll: createCancelAll(instance),
    close: createClose(instance),
    deposit: createDeposit(instance),
    getFilledOrders: createGetFilledOrders(instance),
    getFundingFees: createGetFundingFees(instance),
    getOpenOrders: createGetOpenOrders(instance),
    getPosition: createGetPosition(instance),
    getTransfers: createGetTransfers(instance),
    newOrder: createNewOrder(instance),
    setLeverage: createSetLeverage(instance),
    withdraw: createWithdraw(instance),
  }
}
