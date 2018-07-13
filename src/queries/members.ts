import gql from 'graphql-tag'

import member from './fragments/member'

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
