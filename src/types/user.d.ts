import { AuthorTypes } from './message'

export interface User {
  name: string
  avatar: string
  id: string
  type: AuthorTypes
}
