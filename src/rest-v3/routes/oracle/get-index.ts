import type { KyInstance } from 'ky'
import type { PaginationInput } from '../../types.js'

export type GetIndexInput = PaginationInput

export type GetIndexOutput = {
  index: number
  time: string
}[]

type GetIndex = (input?: GetIndexInput) => Promise<GetIndexOutput>

export const createGetIndex = (instance: KyInstance): GetIndex => {
  return async ({ from, limit, to } = {}) => {
    return instance
      .get('oracle/index', { searchParams: { from, limit, to } })
      .json()
  }
}
