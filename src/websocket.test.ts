import { beforeEach, describe, expect, test } from 'vitest'

import { createWebsocketClient, type WebsocketClient } from './websocket.js'

type WebsocketContext = {
  client: WebsocketClient
}

beforeEach<WebsocketContext>(async (ctx) => {
  ctx.client = await createWebsocketClient()
})

describe('websocket', () => {
  test<WebsocketContext>('ping should be successful', async (ctx) => {
    const result = await ctx.client.ping()
    expect(result).toBe('pong')
  })
})
