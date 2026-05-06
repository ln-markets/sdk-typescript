import { createHmac, randomBytes } from 'node:crypto'

import type { StreamInstance } from '../instance.js'

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
  input: AuthenticateInput
) => Promise<AuthenticateOutput>

export const createAuthenticate = (instance: StreamInstance): Authenticate => {
  return async ({ key, secret, passphrase }) => {
    const nonce = randomBytes(8).toString('hex')
    const timestamp = Date.now()
    const signature = createHmac('sha256', secret)
      .update(`${timestamp}${nonce}`)
      .digest('base64')

    return instance.request<AuthenticateOutput>({
      method: 'authenticate',
      params: { key, signature, timestamp, passphrase, nonce },
    })
  }
}
