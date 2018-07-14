import gql from 'graphql-tag'

const member = gql`
  fragment member on Member {
    name
    color
    id
    avatarURL
  }
`

export default member
