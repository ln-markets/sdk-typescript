import { describe, expect, test } from 'vitest'

import { buildAuthPayload, signAuth } from './signing.js'

describe('buildAuthPayload', () => {
  test('concatenates timestamp and nonce verbatim', () => {
    expect(
      buildAuthPayload({ timestamp: 1_700_000_000_000, nonce: 'abcd' })
    ).toBe('1700000000000abcd')
  })

  test('different nonces yield different payloads', () => {
    expect(buildAuthPayload({ timestamp: 1, nonce: 'a' })).not.toBe(
      buildAuthPayload({ timestamp: 1, nonce: 'b' })
    )
  })
})

describe('signAuth', () => {
  test('returns a deterministic base64 HMAC-SHA256 over (secret, payload)', () => {
    const sig = signAuth('test-secret', 'payload-1')
    expect(sig).toBe('JJ8q7bXc7Kkj7cjj1EgBqA9pn70I9b2B8iLeDwDtQ2Y=')
    expect(signAuth('test-secret', 'payload-1')).toBe(sig)
  })

  test('different secrets yield different signatures', () => {
    expect(signAuth('s1', 'p')).not.toBe(signAuth('s2', 'p'))
  })
})
