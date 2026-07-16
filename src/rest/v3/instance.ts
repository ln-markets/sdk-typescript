import type { KyInstance } from 'ky'
import ky from 'ky'
import { match } from 'ts-pattern'

import { buildSignaturePayload, signRequest } from './internal/signing.js'

export interface Options {
  key?: string
  passphrase?: string
  secret?: string
  network?: 'mainnet' | 'signet'
}

const isNonEmptyString = (value?: string): value is string => {
  return typeof value === 'string' && value !== ''
}

export const createInstance = ({
  key,
  secret,
  passphrase,
  network = 'mainnet',
}: Readonly<Options> = {}): KyInstance => {
  const prefix = match(network)
    .with('mainnet', () => 'https://api.lnmarkets.com/v3')
    .with('signet', () => 'https://api.signet.lnmarkets.com/v3')
    .exhaustive()

  return ky.create({
    prefix,
    retry: 0,
    hooks: {
      beforeRequest: [
        // oxlint-disable-next-line typescript/prefer-readonly-parameter-types -- ky hook arg; we mutate request.headers via .set()
        ({ request, options }) => {
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

          const payload = buildSignaturePayload({
            timestamp,
            method: request.method,
            pathname: url.pathname,
            data,
          })
          const signature = signRequest(secret, payload)

          request.headers.set('lnm-access-key', key)
          request.headers.set('lnm-access-passphrase', passphrase)
          request.headers.set('lnm-access-timestamp', timestamp.toString())
          request.headers.set('lnm-access-signature', signature)
        },
      ],
    },
  })
}
