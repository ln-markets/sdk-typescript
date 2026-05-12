import type { StreamInstance } from '../instance.js'

export interface WhoamiOutput {
  apiKey: string
  userId: string
  permissions: string[]
}

export type Whoami = () => Promise<WhoamiOutput>

export const createWhoami = (instance: StreamInstance): Whoami => {
  return async () => {
    return instance.request<WhoamiOutput>({ method: 'whoami' })
  }
}
