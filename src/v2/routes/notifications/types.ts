import type { UUID } from '../../index.js'

export interface Notification {
  creationTs: number
  data: unknown
  event: string
  id: UUID
}
