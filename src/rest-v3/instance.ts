import type { KyInstance } from 'ky'

import { createHmac } from 'node:crypto'

import ky from 'ky'

import { match } from 'ts-pattern'

export interface Options {
  key?: string
  passphrase?: string
  secret?: string
  network?: 'mainnet' | 'testnet4'
}

const isNonEmptyString = (value?: string): value is string => {
  return typeof value === 'string' && value !== ''
}

export const createInstance = ({
  key,
  secret,
  passphrase,
  network = 'mainnet',
}: Options = {}): KyInstance => {
  const prefixUrl = match(network)
    .with('mainnet', () => 'https://api.lnmarkets.com/v3')
    .with('testnet4', () => 'https://api.testnet4.lnmarkets.com/v3')
    .exhaustive()

  return ky.create({
    prefixUrl: process.env.V3_API_URL ?? prefixUrl,
    retry: 0,
    hooks: {
      beforeRequest: [
        (request, options) => {
          if (
            !isNonEmptyString(key) ||
            !isNonEmptyString(passphrase) ||
            !isNonEmptyString(secret)
          ) {
            return
          }

          const url = new URL(request.url)
          const bodyData = typeof options.body === 'string' ? options.body : ''
          const data = bodyData || url.search
          const timestamp = Date.now()

          const payload = `${timestamp}${request.method.toLowerCase()}${url.pathname}${data}`

          const signature = createHmac('sha256', secret)
            .update(payload)
            .digest('base64')

          request.headers.set('lnm-access-key', key)
          request.headers.set('lnm-access-passphrase', passphrase)
          request.headers.set('lnm-access-timestamp', timestamp.toString())
          request.headers.set('lnm-access-signature', signature)
        },
      ],
    },
  })
}
