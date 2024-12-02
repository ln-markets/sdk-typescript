import type { UUID } from '#src/index.js'

export type Notification = {
  creationTs: number
  data: unknown
  event: string
  id: UUID
}
