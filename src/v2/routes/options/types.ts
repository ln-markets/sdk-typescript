export interface OptionsInstrument {
  volatility: number
}

export interface OptionsMarketDetails {
  active: boolean
  fees: {
    trading: number
  }
  limits: {
    count: {
      max: number
    }
    margin: {
      max: number
      min: number
    }
    quantity: {
      max: number
      min: number
    }
  }
}

export type OptionsSettlement = 'cash' | 'physical'

export type OptionsSide = 'b' | 's'

export interface OptionsTrade {
  closed: boolean
  closedTs?: number
  closingFee: number
  creationTs: number
  domestic: string
  exercised: boolean
  expired: boolean
  expiryTs: number
  fixingPrice?: number
  forward: number
  forwardPoint: number
  id: string
  legId: string
  maintenanceMargin: number
  margin: number
  openingFee: number
  physicalDeliveryId?: string
  pl: number
  quantity: number
  running: boolean
  settlement: OptionsSettlement
  side: OptionsSide
  strike: number
  type: OptionsType
  uid: string
  volatility: number
}

export type OptionsTradeClosed =
  | OptionsTradeClosedCash
  | OptionsTradeClosedPhysical

export type OptionsTradeClosedCash = OptionsTrade & {
  closed: true
  closedTs: number
  expired: false
  fixingPrice: number
  physicalDeliveryId?: undefined
}

export type OptionsTradeClosedPhysical = OptionsTrade & {
  closed: true
  closedTs: number
  fixingPrice: number
  physicalDeliveryId: string
}

export type OptionsTradeExpired =
  | OptionsTradeExpiredCash
  | OptionsTradeExpiredPhysicalDelivered
  | OptionsTradeExpiredPhysicalNotDelivered

export type OptionsTradeExpiredCash = OptionsTrade & {
  closed: false
  closedTs: number
  expired: true
  fixingPrice: number
  physicalDeliveryId?: undefined
}

export type OptionsTradeExpiredPhysical = OptionsTrade & {
  closed: false
  closedTs: number
  expired: true
  fixingPrice: number
}

export type OptionsTradeExpiredPhysicalDelivered =
  OptionsTradeExpiredPhysical & {
    physicalDeliveryId: string
  }

export type OptionsTradeExpiredPhysicalNotDelivered =
  OptionsTradeExpiredPhysical & {
    physicalDeliveryId?: undefined
  }

export interface OptionsTradeOrder {
  instrumentName: string
  quantity: number
  settlement: OptionsSettlement
  side: OptionsSide
}

export type OptionsTradeRunning = OptionsTrade & {
  closed: false
  closedTs?: undefined
  physicalDeliveryId?: undefined
}

export type OptionsTradeRunningWithDelta = OptionsTradeRunning & {
  delta: number
}

export type OptionsTradeStatus = 'closed' | 'running'

export type OptionsTradeWithDelta = OptionsTrade & {
  delta?: number
}

export type OptionsType = 'c' | 'p'

export interface OptionsVolatilityIndex {
  volatilityIndex: number
}
