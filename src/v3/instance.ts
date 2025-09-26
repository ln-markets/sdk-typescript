import type { KyInstance, HTTPError } from 'ky'

import { createHmac } from 'node:crypto'

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
    .with('mainnet', () => getPrefixUrl())
    .with('testnet', () => 'https://api.testnet4.lnmarkets.com/v3')
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

const getPrefixUrl = (): string => {
  const hostname = process.env.LNM_API_URL_V3
  return hostname ? `${hostname}/v3` : 'https://api.kha.dev.lnmarkets.com/v3'
}
