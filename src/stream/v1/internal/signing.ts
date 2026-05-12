import { createHmac } from 'node:crypto'

export interface AuthPayloadInput {
  timestamp: number
  nonce: string
}

// Stream auth payload: HMAC-SHA256 over `${timestamp}${nonce}` keyed by the API
// Secret. Extracted as pure functions so the format is unit-testable without a
// Live WebSocket.
export const buildAuthPayload = ({
  timestamp,
  nonce,
}: Readonly<AuthPayloadInput>): string => {
  return `${timestamp}${nonce}`
}

export const signAuth = (secret: string, payload: string): string => {
  return createHmac('sha256', secret).update(payload).digest('base64')
}
