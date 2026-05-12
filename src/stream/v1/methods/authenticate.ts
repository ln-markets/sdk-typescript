import { randomBytes } from 'node:crypto'

import type { StreamInstance } from '../instance.js'
import { buildAuthPayload, signAuth } from '../internal/signing.js'

export interface AuthenticateInput {
  key: string
  secret: string
  passphrase: string
}

export interface AuthenticateOutput {
  authenticated: boolean
  permissions: string[]
}

export type Authenticate = (
  input: Readonly<AuthenticateInput>
) => Promise<AuthenticateOutput>

export const createAuthenticate = (
  instance: Readonly<StreamInstance>
): Authenticate => {
  return async ({ key, secret, passphrase }) => {
    const nonce = randomBytes(16).toString('hex')
    const timestamp = Date.now()
    const signature = signAuth(secret, buildAuthPayload({ timestamp, nonce }))

    return instance.request<AuthenticateOutput>({
      method: 'authenticate',
      params: { key, signature, timestamp, passphrase, nonce },
    })
  }
}
