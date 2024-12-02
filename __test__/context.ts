import type { RestClient } from '#src/types.js'

import dotenv from 'dotenv'
import { beforeEach } from 'vitest'

import { createRestClient } from '../src/index.js'

declare module 'vitest' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  export interface TestContext {
    authClient: RestClient
    client: RestClient
  }
}

dotenv.config()

const getEnvOrThrow = (key: string) => {
  const value = process.env[key]
  if (!value) {
    throw new Error(`Environment variable ${key} is not set`)
  }
  return value
}

beforeEach((ctx) => {
  ctx.authClient = createRestClient({
    key: getEnvOrThrow('LNM_API_KEY'),
    passphrase: getEnvOrThrow('LNM_API_PASSPHRASE'),
    secret: getEnvOrThrow('LNM_API_SECRET'),
  })

  ctx.client = createRestClient()
})
