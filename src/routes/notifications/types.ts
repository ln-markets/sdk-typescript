import type { UUID } from '../../index.js'

export type Notification = {
  creationTs: number
  data: unknown
  event: string
  id: UUID
}
