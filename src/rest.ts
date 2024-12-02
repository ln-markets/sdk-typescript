import camelcaseKeys from 'camelcase-keys'
import { createHmac } from 'node:crypto'
import { URL, URLSearchParams } from 'node:url'
import { fetch } from 'undici'

import { createRouter } from './routes/index.js'
import { getHostname } from './utils.js'

export type RestClient = ReturnType<typeof createRestClient>

export type RestFetcher = (options: RequestOptions) => Promise<unknown>

type RequestOptions = {
  body?: Record<string, boolean | number | string>
  method: string
  path: string
  query?: Record<string, boolean | number | string>
  requireAuth?: boolean
}
type RestOptions = {
  headers?: Record<string, string>
  key?: string
  network?: 'mainnet' | 'testnet'
  passphrase?: string
  secret?: string
}

class HttpError extends Error {
  status: number
  statusText: string

  constructor(status: number, statusText: string, message: string) {
    super(message)

    this.name = 'HttpError'
    this.status = status
    this.statusText = statusText
  }
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

  const request = async (options: RequestOptions) => {
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

    if (body && /^(POST|PUT)$/.test(method)) {
      Object.assign(headers, {
        'Content-Type': 'application/json',
      })
    }

    const payload = /^(POST|PUT)$/.test(method)
      ? JSON.stringify(body)
      : undefined

    const response = await fetch(url, {
      body: payload,
      headers,
      method,
      mode: 'cors',
    })

    if (response.ok) {
      if (response.headers.get('content-type')?.includes('application/json')) {
        return response
          .json()
          .then((value) =>
            camelcaseKeys(value as Record<string, unknown>, { deep: true })
          )
      }

      return response.text()
    }

    const text = await response.text()

    throw new HttpError(response.status, response.statusText, text)
  }

  return createRouter(request)
}
