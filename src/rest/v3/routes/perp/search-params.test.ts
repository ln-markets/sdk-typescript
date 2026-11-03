import { describe, expect, it } from 'vitest'

import { toPerpPageSearchParams } from './search-params.js'

describe('toPerpPageSearchParams', () => {
  it('should send the cursor as a deep object', () => {
    expect(
      toPerpPageSearchParams({
        cursor: { id: 'trade-id', value: '2024-01-15T10:30:00.000Z' },
        limit: 10,
      })
    ).toStrictEqual({
      'cursor[id]': 'trade-id',
      'cursor[value]': '2024-01-15T10:30:00.000Z',
      from: undefined,
      limit: 10,
      to: undefined,
    })
  })

  it('should leave the cursor out of the first page', () => {
    expect(toPerpPageSearchParams({})).toStrictEqual({
      'cursor[id]': undefined,
      'cursor[value]': undefined,
      from: undefined,
      limit: undefined,
      to: undefined,
    })
  })
})
