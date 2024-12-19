export { createRestClient } from './rest.js'
export type { RestClient } from './rest.js'

export type * from './routes/futures/types.js'
export type * from './routes/notifications/types.js'
export type * from './routes/options/types.js'
export type * from './routes/swaps/types.js'
export type * from './routes/user/types.js'

export { createWebsocketClient } from './websocket.js'

export type UUID = `${string}-${string}-${string}-${string}-${string}`

export type { WebsocketClient } from './websocket.js'
