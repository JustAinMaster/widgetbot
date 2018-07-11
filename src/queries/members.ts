import gql from 'graphql-tag'

import member, { Member } from './fragments/member'

export interface Members {
  server: {
    members: Member[]
  }
}

export interface VMembers {
  server: string
}

const MEMBERS = gql`
  query Members($server: ID!) {
    server(id: $server) {
      members {
        ...member
      }
    }
  }
  ${member}
`

export default MEMBERS
