import { beforeEach, describe, expect, test } from 'vitest'

import type { RestClient } from './rest.js'

import { createRestClient } from './rest.js'

const getEnvOrThrow = (key: string) => {
  const value = process.env[key]
  if (!value) {
    throw new Error(`Environment variable ${key} is not set`)
  }
  return value
}

interface RestContext {
  authClient: RestClient
  client: RestClient
}

beforeEach<RestContext>((ctx) => {
  ctx.authClient = createRestClient({
    key: getEnvOrThrow('LNM_API_KEY'),
    passphrase: getEnvOrThrow('LNM_API_PASSPHRASE'),
    secret: getEnvOrThrow('LNM_API_SECRET'),
  })

  ctx.client = createRestClient({
    key: '',
    passphrase: '',
    secret: '',
  })
})

describe('get user route', () => {
  test<RestContext>('should throw if not authenticated', async (ctx) => {
    await expect(ctx.client.user.get()).rejects.toThrow()
  })

  test<RestContext>('should return the user', async (ctx) => {
    await expect(ctx.authClient.user.get()).resolves.toBeDefined()
  })
})
