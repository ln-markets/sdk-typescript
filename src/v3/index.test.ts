import { describe, expect, test as base } from 'vitest'

import type { HttpClient } from './index.js'

import { createHttpClient } from './index.js'

const test = base.extend<{
  client: HttpClient
  authClient: HttpClient
}>({
  client: [
    async ({}, use) => {
      const client = createHttpClient()
      await use(client)
    },
    {
      auto: true,
    },
  ],
  authClient: [
    async ({}, use) => {
      const client = createHttpClient({
        key: process.env.V3_API_KEY,
        secret: process.env.V3_API_KEY_SECRET,
        passphrase: process.env.V3_API_KEY_PASSPHRASE,
      })
      await use(client)
    },
    {
      auto: true,
    },
  ],
})

describe('v2', () => {
  describe('basics', () => {
    test('should return time', async ({ client }) => {
      const { time } = await client.time()
      expect(time).toBeInstanceOf(String)
    })

    test('should return ping', async ({ client }) => {
      const ping = await client.ping()
      expect(ping).toBe('pong')
    })
  })

  describe('get invoice', () => {
    test('should return the invoice', async ({ client }) => {
      const result = await client.account.depositLightning({ amount: 100_000 })
      expect(result).toMatchObject({
        depositId: expect.any(String),
        paymentRequest: expect.any(String),
      })
    })
  })

  describe('futures', () => {
    test('should open a new trade', async ({ authClient }) => {
      const result = await authClient.futures.isolated.newTrade({
        type: 'l',
        side: 'b',
        price: 100_000,
        quantity: 1,
        leverage: 100,
      })

      expect(result).toMatchObject({
        id: expect.any(String),
        running: expect.any(Boolean),
        side: expect.any(String),
        type: expect.any(String),
        leverage: expect.any(Number),
        margin: expect.any(Number),
        price: expect.any(Number),
        quantity: expect.any(Number),
        stoploss: expect.any(Number),
      })

      await authClient.futures.isolated.cancel({
        id: result.id,
      })
    })
  })

  describe('get user', () => {
    test('should throw if not authenticated', async ({ client }) => {
      await expect(client.account.get()).rejects.toThrow()
    })

    test('should return the user', async ({ authClient }) => {
      await expect(authClient.account.get()).resolves.toMatchObject({
        balance: expect.any(Number),
        email: expect.any(String),
        feeTier: expect.any(Number),
        id: expect.any(String),
        linkingpublickey: expect.any(String),
        syntheticUsdBalance: expect.any(Number),
        username: expect.any(String),
      })
    })
  })
})
