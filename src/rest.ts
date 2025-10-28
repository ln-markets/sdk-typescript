// oxlint-disable no-unsafe-type-assertion
import camelcaseKeys from 'camelcase-keys'
import ky from 'ky'
import type { Options } from 'ky'
import { createHmac } from 'node:crypto'
import { URLSearchParams, URL } from 'node:url'

import { createRouter } from './routes/index.js'
import { getHostname } from './utils.js'

interface RequestOptions {
  body?: Record<string, boolean | number | string>
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  path: string
  query?: Record<string, boolean | number | string>
  requireAuth?: boolean
}
interface RestOptions {
  headers?: Record<string, string>
  key?: string
  network?: 'mainnet' | 'testnet'
  passphrase?: string
  secret?: string
}

export const createRestClient = (options: RestOptions = {}) => {
  const {
    headers = {},
    key = process.env.LNM_API_KEY,
    network = process.env.LNM_API_NETWORK ?? 'mainnet',
    passphrase = process.env.LNM_API_PASSPHRASE,
    secret = process.env.LNM_API_SECRET,
  } = options

  const hostname = process.env.LNM_API_HOSTNAME ?? getHostname(network)

  const request = async <T>(options: RequestOptions): Promise<T> => {
    const { body, method, path, query, requireAuth } = options

    if (requireAuth) {
      if (!key) {
        throw new Error('You need an API key to use an authenticated route')
      } else if (!secret) {
        throw new Error('You need an API secret to use an authenticated route')
      } else if (!passphrase) {
        throw new Error(
          'You need an API passphrase to use an authenticated route'
        )
      }

      const timestamp = Date.now()

      const payload = /^(GET|DELETE)$/.test(method)
        ? new URLSearchParams(
            Object.fromEntries(
              Object.entries(query ?? {}).map(([key, value]) => [
                key,
                JSON.stringify(value),
              ])
            )
          ).toString()
        : JSON.stringify(body ?? {})

      const signature = createHmac('sha256', secret)
        .update(`${timestamp}${method}/v2${path}${payload}`)
        .digest('base64')

      Object.assign(headers, {
        'LNM-ACCESS-KEY': key,
        'LNM-ACCESS-PASSPHRASE': passphrase,
        'LNM-ACCESS-SIGNATURE': signature,
        'LNM-ACCESS-TIMESTAMP': timestamp,
      })
    }

    const url = new URL(`https://${hostname}/v2${path}`)

    if (query) {
      for (const [key, value] of Object.entries(query)) {
        url.searchParams.append(key, value.toString())
      }
    }

    const kyOptions: Options = {
      headers,
      method,
    }

    if (body && /^(POST|PUT)$/.test(method)) {
      kyOptions.json = body
    }

    const response = await ky(url, kyOptions)

    const contentType = response.headers.get('content-type')

    if (contentType?.includes('application/json')) {
      const value = await response.json()
      return camelcaseKeys(value as Record<string, unknown>, {
        deep: true,
      }) as T
    }

    throw new Error('Unexpected content type')
  }

  return createRouter(request)
}

export type RestClient = ReturnType<typeof createRestClient>

export type RestFetcher = <T = void>(options: RequestOptions) => Promise<T>
