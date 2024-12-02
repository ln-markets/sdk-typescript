import { describe, expect, test } from 'vitest'

describe('get user route', () => {
  test('should throw if not authenticated', async (ctx) => {
    await expect(ctx.client.user.get()).rejects.toThrow()
  })

  test('should return the user', async (ctx) => {
    await expect(ctx.authClient.user.get()).resolves.toBeDefined()
  })
})
