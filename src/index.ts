export { createRestClient } from './rest.js'
export type { RestClient } from './rest.js'

export type * from './routes/index.js'
export { createWebsocketClient } from './websocket.js'

export type UUID = `${string}-${string}-${string}-${string}-${string}`

export type { WebsocketClient } from './websocket.js'
