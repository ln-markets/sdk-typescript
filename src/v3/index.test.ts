import { describe, expect, test as base } from 'vitest'

import type { HttpClient } from './index.js'
import { HTTPError } from 'ky'
import { createHttpClient } from './index.js'

const test = base.extend<{
  client: HttpClient
  authClient: HttpClient
}>({
  client: [
    async ({}, use) => {
      const client = createHttpClient({ network: 'testnet4' })
      await use(client)
    },
    {
      auto: true,
    },
  ],
  authClient: [
    async ({}, use) => {
      const client = createHttpClient({
        network: 'testnet4',
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

describe('v3', () => {
  describe('basics', () => {
    test('should return time', async ({ client }) => {
      const result = await client.time()
      expect(result).toStrictEqual({
        time: expect.any(String),
      })
    })

    test('should return ping', async ({ client }) => {
      const ping = await client.ping()
      expect(ping).toBe('pong')
    })

    test('should return ping with authenticated client', async ({
      authClient,
    }) => {
      const ping = await authClient.ping()
      expect(ping).toBe('pong')
    })
  })

  describe('get invoice', () => {
    test('should return the invoice', async ({ authClient }) => {
      const result = await authClient.account.depositLightning({
        amount: 100_000,
      })

      expect(result).toStrictEqual({
        depositId: expect.any(String),
        paymentRequest: expect.any(String),
      })
    })

    test('should fetch not settled lightning deposits', async ({
      authClient,
    }) => {
      const result = await authClient.account.getLightningDeposits({
        settled: false,
      })

      expect(result).toStrictEqual(
        expect.arrayContaining([
          {
            amount: expect.any(Number),
            comment: null,
            createdAt: expect.any(String),
            id: expect.any(String),
            paymentHash: expect.any(String),
            settledAt: null,
          },
        ])
      )
    })

    test('should fetch settled lightning deposits', async ({ authClient }) => {
      const result = await authClient.account.getLightningDeposits({
        settled: true,
      })

      expect(result).toStrictEqual([])
    })
  })

  describe('futures', () => {
    test('should error', async ({ authClient }) => {
      await expect(
        authClient.futures.cross.newOrder({
          type: 'limit',
          side: 'b',
          price: 1.5,
          quantity: 1,
        })
      ).rejects.toThrow(HTTPError)
    })

    test('should open a new trade', async ({ authClient }) => {
      const result = await authClient.futures.isolated.newTrade({
        type: 'l',
        side: 'b',
        price: 100_000,
        quantity: 1,
        leverage: 100,
        clientId: 'test-client-id',
      })

      expect(result).toStrictEqual({
        canceled: false,
        closed: false,
        closedAt: null,
        closingFee: 0,
        createdAt: expect.any(String),
        entryMargin: 10,
        entryPrice: 100_000,
        exitPrice: null,
        filledAt: null,
        id: expect.any(String),
        leverage: 100,
        liquidation: 99_010,
        maintenanceMargin: 2,
        margin: expect.any(Number),
        open: true,
        openingFee: 0,
        pl: 0,
        price: 100_000,
        quantity: 1,
        running: false,
        side: expect.any(String),
        stoploss: expect.any(Number),
        sumFundingFees: 0,
        takeprofit: 0,
        type: expect.any(String),
        clientId: 'test-client-id',
      })

      await authClient.futures.isolated.cancel({ id: result.id })
    })

    test('should list closed trades', async ({ authClient }) => {
      const result = await authClient.futures.isolated.getClosedTrades({
        from: new Date('2025-01-01').toISOString(),
        to: new Date('2025-10-01').toISOString(),
        limit: 10,
      })

      expect(result).toMatchObject([])
    })

    test('get candles', async ({ authClient }) => {
      const result = await authClient.futures.getCandles({
        from: new Date('2025-01-01').toISOString(),
        to: new Date('2025-10-01').toISOString(),
        limit: 10,
        range: '1m',
      })

      expect(result).toHaveLength(10)
      expect(result).toMatchObject(
        expect.arrayContaining([
          expect.objectContaining({
            close: expect.any(Number),
            high: expect.any(Number),
            low: expect.any(Number),
            open: expect.any(Number),
          }),
        ])
      )
    })
  })

  describe('get user', () => {
    test('should throw if not authenticated', async ({ client }) => {
      await expect(client.account.get()).rejects.toThrow()
    })

    test('should return the user', async ({ authClient }) => {
      await expect(authClient.account.get()).resolves.toStrictEqual({
        balance: expect.any(Number),
        email: null,
        feeTier: expect.any(Number),
        id: expect.any(String),
        syntheticUsdBalance: expect.any(Number),
        linkingPublicKey: expect.any(String),
        username: expect.any(String),
      })
    })
  })
})
