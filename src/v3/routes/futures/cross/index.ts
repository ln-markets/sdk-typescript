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

export type * from './cancel-all.js'
export type * from './cancel.js'
export type * from './close.js'
export type * from './deposit.js'
export type * from './get-filled-orders.js'
export type * from './get-funding-fees.js'
export type * from './get-open-orders.js'
export type * from './get-position.js'
export type * from './get-transfers.js'
export type * from './new-order.js'
export type * from './set-leverage.js'
export type * from './withdraw.js'

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
