import { beforeEach, describe, expect, test } from 'vitest'

import type { HttpClient } from './index.js'

import { createHttpClient } from './index.js'

interface RestContext {
  authClient: HttpClient
  client: HttpClient
}

beforeEach<RestContext>((ctx) => {
  ctx.authClient = createHttpClient({
    key: process.env.LNM_API_KEY_V2,
    passphrase: process.env.LNM_API_PASSPHRASE_V2,
    secret: process.env.LNM_API_SECRET_V2,
  })

  ctx.client = createHttpClient()
})

describe('get user route', () => {
  test<RestContext>('should throw if not authenticated', async (ctx) => {
    await expect(ctx.client.user.get()).rejects.toThrow()
  })

  test<RestContext>('should return the user', async (ctx) => {
    await expect(ctx.authClient.user.get()).resolves.toBeDefined()
  })
})
