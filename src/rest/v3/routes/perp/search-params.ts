import type { PerpPaginationInput } from './types.js'

// The API reads the cursor as a deep object: `cursor[value]` and `cursor[id]`.
export const toPerpPageSearchParams = ({
  cursor,
  from,
  limit,
  to,
}: Readonly<PerpPaginationInput>) => ({
  'cursor[id]': cursor?.id,
  'cursor[value]': cursor?.value,
  from,
  limit,
  to,
})
