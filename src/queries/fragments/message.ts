import gql from 'graphql-tag'

import member from './member'

const message = gql`
  fragment message on Message {
    id
    timestamp
    author {
      ...member
    }
  }

  ${member}
`

export default message
