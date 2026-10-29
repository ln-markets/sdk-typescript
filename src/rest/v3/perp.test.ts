// oxlint-disable typescript/prefer-readonly-parameter-types -- vitest fixture destructure {client, authClient}; not meaningfully readonly
import { describe, expect } from 'vitest'

import { HAS_AUTH } from '../../../__test__/network.js'
import { test } from '../../../__test__/test.js'

describe('rest/v3 perp', () => {
  describe('markets', () => {
    test('should list the BTC/USD market', async ({ client }) => {
      const markets = await client.markets()

      expect(markets).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            instrument: 'inverse_perp',
            pair: 'btc_usd',
          }),
        ])
      )
    })
  })

  describe('perp', () => {
    const btcUsd = { instrument: 'inverse_perp', pair: 'btc_usd' } as const

    test('should return the ticker', async ({ client }) => {
      const ticker = await client.perp.getTicker(btcUsd)

      expect(ticker).toMatchObject({
        ...btcUsd,
        fundingRate: expect.any(Number),
        fundingTime: expect.any(String),
        lastPrice: expect.any(Number),
        mark: expect.any(Number),
        prices: expect.any(Array),
        quantoAdjustmentRate: expect.any(Number),
        time: expect.any(String),
      })
    })

    test('should page the candles', async ({ client }) => {
      const first = await client.perp.getCandles({
        ...btcUsd,
        from: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
        limit: 2,
        range: '1m',
      })

      expect(first).toMatchObject({
        ...btcUsd,
        data: expect.arrayContaining([
          {
            close: expect.any(Number),
            high: expect.any(Number),
            low: expect.any(Number),
            open: expect.any(Number),
            time: expect.any(String),
            volume: expect.any(Number),
          },
        ]),
      })
      expect(first.nextCursor).toStrictEqual({ value: expect.any(String) })

      const next = await client.perp.getCandles({
        ...btcUsd,
        cursor: first.nextCursor ?? undefined,
        limit: 2,
        range: '1m',
      })
      expect(next.data.length).toBeGreaterThan(0)
    })

    test('should page the funding settlements', async ({ client }) => {
      const first = await client.perp.getFundingSettlements({
        ...btcUsd,
        limit: 1,
      })

      expect(first).toMatchObject({
        ...btcUsd,
        data: [
          {
            fixingPrice: expect.any(Number),
            fundingRate: expect.any(Number),
            id: expect.any(String),
            quantoAdjustmentRate: expect.any(Number),
            time: expect.any(String),
          },
        ],
        nextCursor: { id: expect.any(String), value: expect.any(String) },
      })

      const next = await client.perp.getFundingSettlements({
        ...btcUsd,
        cursor: first.nextCursor ?? undefined,
        limit: 1,
      })
      expect(next.data[0]?.id).not.toBe(first.data[0]?.id)
    })

    test.skipIf(!HAS_AUTH)(
      'should open and cancel a trade',
      async ({ authClient }) => {
        const trade = await authClient.perp.isolated.newTrade({
          ...btcUsd,
          type: 'limit',
          side: 'buy',
          price: 10_000,
          quantity: 1,
          leverage: 10,
        })

        try {
          expect(trade).toMatchObject({
            ...btcUsd,
            canceled: false,
            closed: false,
            filledAt: null,
            open: true,
            price: 10_000,
            quantity: 1,
            running: false,
            type: 'limit',
          })

          const open = await authClient.perp.isolated.getOpenTrades(btcUsd)
          expect(open.map(({ id }) => id)).toContain(trade.id)
        } finally {
          const canceled = await authClient.perp.isolated.cancel({
            ...btcUsd,
            id: trade.id,
          })
          expect(canceled).toMatchObject({ canceled: true, id: trade.id })
        }
      }
    )

    test.skipIf(!HAS_AUTH)(
      'should list trades of every market',
      async ({ authClient }) => {
        const running = await authClient.perp.isolated.getRunningTrades()
        expect(running).toStrictEqual(expect.any(Array))

        const canceled = await authClient.perp.isolated.getCanceledTrades({
          limit: 1,
        })
        expect(canceled).toStrictEqual({
          data: expect.any(Array),
          nextCursor: canceled.nextCursor,
        })
      }
    )
  })
})
