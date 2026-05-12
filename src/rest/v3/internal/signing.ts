import { createHmac } from 'node:crypto'

export interface SignaturePayloadInput {
  timestamp: number
  method: string
  pathname: string
  data: string
}

// Canonical request: `${timestamp}${method.toLowerCase()}${pathname}${data}`
// Where `data` is either the raw JSON body (for POST/PUT) or `url.search`
// (including the leading `?`) for GET with query params, or `''` otherwise.
// Extracted as a pure function so the payload format is unit-testable
// Independently of the ky transport hook.
export const buildSignaturePayload = ({
  timestamp,
  method,
  pathname,
  data,
}: Readonly<SignaturePayloadInput>): string => {
  return `${timestamp}${method.toLowerCase()}${pathname}${data}`
}

export const signRequest = (secret: string, payload: string): string => {
  return createHmac('sha256', secret).update(payload).digest('base64')
}
