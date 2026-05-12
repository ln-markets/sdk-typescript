import { describe, expect, test } from 'vitest'

import { buildSignaturePayload, signRequest } from './signing.js'

describe('buildSignaturePayload', () => {
  test('lowercases method and concatenates fields verbatim', () => {
    expect(
      buildSignaturePayload({
        timestamp: 1_700_000_000_000,
        method: 'POST',
        pathname: '/v3/futures/isolated/trade',
        data: '{"side":"buy"}',
      })
    ).toBe('1700000000000post/v3/futures/isolated/trade{"side":"buy"}')
  })

  test('preserves leading `?` in url.search for GET payloads', () => {
    expect(
      buildSignaturePayload({
        timestamp: 1,
        method: 'GET',
        pathname: '/v3/account',
        data: '?limit=10',
      })
    ).toBe('1get/v3/account?limit=10')
  })

  test('empty data segment for body-less requests', () => {
    expect(
      buildSignaturePayload({
        timestamp: 42,
        method: 'GET',
        pathname: '/v3/ping',
        data: '',
      })
    ).toBe('42get/v3/ping')
  })
})

describe('signRequest', () => {
  test('returns a deterministic base64 HMAC-SHA256 over (secret, payload)', () => {
    const sig = signRequest('test-secret', 'payload-1')
    expect(sig).toBe('JJ8q7bXc7Kkj7cjj1EgBqA9pn70I9b2B8iLeDwDtQ2Y=')
    expect(signRequest('test-secret', 'payload-1')).toBe(sig)
  })

  test('different payloads yield different signatures', () => {
    expect(signRequest('s', 'a')).not.toBe(signRequest('s', 'b'))
  })

  test('different secrets yield different signatures', () => {
    expect(signRequest('s1', 'p')).not.toBe(signRequest('s2', 'p'))
  })
})
