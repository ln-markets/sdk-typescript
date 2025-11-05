// oxlint-disable no-null
import { describe, expect, test as base } from 'vitest'

import type { HttpClient } from './index.js'

import { createHttpClient } from './index.js'

const test = base.extend<{
  client: HttpClient
  authClient: HttpClient
}>({
  client: [
    // oxlint-disable-next-line no-empty-pattern
    async ({}, use) => {
      const client = createHttpClient({ network: 'testnet4' })
      await use(client)
    },
    {
      auto: true,
    },
  ],
  authClient: [
    // oxlint-disable-next-line no-empty-pattern
    async ({}, use) => {
      const client = createHttpClient({
        network: 'testnet4',
        key: process.env.V2_API_KEY,
        secret: process.env.V2_API_KEY_SECRET,
        passphrase: process.env.V2_API_KEY_PASSPHRASE,
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
      const time = await client.time()
      expect(time).toBeGreaterThan(0)
    })

    test('should return ping', async ({ client }) => {
      const ping = await client.ping()
      expect(ping).toBe('pong')
    })
  })

  describe('get invoice', () => {
    test('should return the invoice', async ({ authClient }) => {
      const result = await authClient.user.deposit({ amount: 100_000 })
      expect(result).toMatchObject({
        depositId: expect.any(String),
        paymentRequest: expect.any(String),
      })
    })
  })

  describe('futures', () => {
    test('should open a new trade', async ({ authClient }) => {
      const result = await authClient.futures.newTrade({
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

      await authClient.futures.cancelTrade({
        id: result.id,
      })
    })
  })

  describe('get user', () => {
    test('should throw if not authenticated', async ({ client }) => {
      await expect(client.user.get()).rejects.toThrow()
    })

    test('should return the user', async ({ authClient }) => {
      await expect(authClient.user.get()).resolves.toMatchObject({
        accountType: expect.any(String),
        autoWithdrawEnabled: expect.any(Boolean),
        autoWithdrawLightningAddress: null,
        balance: expect.any(Number),
        email: null,
        emailConfirmed: expect.any(Boolean),
        feeTier: expect.any(Number),
        role: expect.any(String),
        showLeaderboard: expect.any(Boolean),
        syntheticUsdBalance: expect.any(Number),
        totpEnabled: expect.any(Boolean),
        uid: expect.any(String),
        username: expect.any(String),
        useTaprootAddresses: expect.any(Boolean),
        webauthnEnabled: expect.any(Boolean),
      })
    })
  })
})
