import type { KyInstance } from 'ky'

import { createHmac } from 'node:crypto'

import camelcaseKeys from 'camelcase-keys'
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
    .with('mainnet', () => 'https://api.lnmarkets.com/v2')
    .with('testnet4', () => 'https://api.testnet4.lnmarkets.com/v2')
    .exhaustive()

  return ky.create({
    prefixUrl: process.env.V2_API_URL ?? prefixUrl,
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

          const payload = `${timestamp}${request.method.toUpperCase()}${url.pathname}${data}`

          const signature = createHmac('sha256', secret)
            .update(payload)
            .digest('base64')

          request.headers.set('LNM-ACCESS-KEY', key)
          request.headers.set('LNM-ACCESS-PASSPHRASE', passphrase)
          request.headers.set('LNM-ACCESS-TIMESTAMP', timestamp.toString())
          request.headers.set('LNM-ACCESS-SIGNATURE', signature)
        },
      ],
      afterResponse: [
        async (_request, _options, response) => {
          const contentType = response.headers.get('content-type')

          if (_request.url.includes('ping')) {
            return response
          }

          if (contentType?.includes('application/json') !== null) {
            const data = await response.json()
            // oxlint-disable-next-line no-unsafe-type-assertion -- Sorry bro
            const camelCased = camelcaseKeys(data as Record<string, unknown>, {
              deep: true,
            })
            return new Response(JSON.stringify(camelCased), {
              status: response.status,
              statusText: response.statusText,
              headers: response.headers,
            })
          }

          return response
        },
      ],
    },
  })
}
