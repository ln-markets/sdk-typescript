import type { KyInstance, HTTPError } from 'ky'

import { createHmac } from 'node:crypto'

import camelcaseKeys from 'camelcase-keys'
import ky from 'ky'
import { match } from 'ts-pattern'

interface RestError {
  code: string
  message: string
}

export interface Options {
  key?: string
  passphrase?: string
  secret?: string
  network?: 'mainnet' | 'testnet'
}

export const createInstance = ({
  key,
  secret,
  passphrase,
  network = 'mainnet',
}: Options = {}): KyInstance => {
  const prefixUrl = match(network)
    .with('mainnet', () => 'https://api.lnmarkets.com/v2')
    .with('testnet', () => 'https://api.testnet.lnmarkets.com/v2')
    .exhaustive()

  return ky.create({
    prefixUrl,
    retry: 0,
    hooks: {
      beforeError: [
        async (error: HTTPError<RestError>) => {
          const url = new URL(error.request.url)
          error.name = 'RestError'

          if (
            error.response.headers
              .get('content-type')
              ?.startsWith('application/json') &&
            error.response.headers.get('content-length') !== '0'
          ) {
            const data = await error.response.json<RestError>()
            error.message = `[${data.code}] ${data.message} at ${error.request.method} ${url.origin}${url.pathname}`
          } else {
            error.message = `[${error.response.status}] ${error.response.statusText} at ${error.request.method} ${url.origin}${url.pathname}`
          }

          Error.captureStackTrace(error)

          return error
        },
      ],
      beforeRequest: [
        (request, options) => {
          if (!key || !passphrase || !secret) {
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

          if (contentType?.includes('application/json')) {
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
