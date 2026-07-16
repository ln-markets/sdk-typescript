// Shared test helpers for picking the target network and reading API creds.
// Both rest/v3 and stream/v1 test suites use the same env-var families
// (SIGNET_API_* vs MAINNET_API_*) and the same opt-into-mainnet rule.

type Network = 'mainnet' | 'signet'

export const NETWORK: Network =
  process.env.NETWORK === 'mainnet' ? 'mainnet' : 'signet'

interface AuthCreds {
  key: string
  secret: string
  passphrase: string
}

// Auth creds: choose env-var family by network. Mainnet uses the canonical
// MAINNET_API_* trio (matches `.env`); signet uses SIGNET_API_*.
export const authCreds = (): AuthCreds | null => {
  const [keyVar, secretVar, passVar] =
    NETWORK === 'signet'
      ? ([
          'SIGNET_API_KEY',
          'SIGNET_API_SECRET',
          'SIGNET_API_PASSPHRASE',
        ] as const)
      : ([
          'MAINNET_API_KEY',
          'MAINNET_API_SECRET',
          'MAINNET_API_PASSPHRASE',
        ] as const)
  const key = process.env[keyVar] ?? ''
  const secret = process.env[secretVar] ?? ''
  const passphrase = process.env[passVar] ?? ''
  if (key === '' || secret === '' || passphrase === '') {
    return null
  }
  return { key, secret, passphrase }
}

export const HAS_AUTH = authCreds() !== null
