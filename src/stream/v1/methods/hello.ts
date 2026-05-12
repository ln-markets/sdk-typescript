import type { StreamInstance } from '../instance.js'

export interface HelloInput {
  clientName: string
  clientVersion: string
}

export interface HelloOutput {
  version: '1.0.0'
}

export type Hello = (input: Readonly<HelloInput>) => Promise<HelloOutput>

export const createHello = (instance: Readonly<StreamInstance>): Hello => {
  return async ({ clientName, clientVersion }) => {
    return instance.request<HelloOutput>({
      method: 'hello',
      params: { clientName, clientVersion },
    })
  }
}
