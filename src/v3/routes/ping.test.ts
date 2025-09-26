import { describe, expect, test } from 'vitest'
import { createHttpClient } from '../index.js'

describe('ping route', () => {
  test('should return pong', async () => {
    const client = createHttpClient()
    const result = await client.ping()
    expect(result).toBe('pong')
  })
})
