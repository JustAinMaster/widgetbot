import gql from 'graphql-tag'

import member, { Member } from './member'

export interface Message {
  id: string
  timestamp: number
  author: Member
}

const message = gql`
  fragment message on IMessage {
    id
    timestamp
    author {
      ...member
    }
  }

  ${member}
`

export default message
