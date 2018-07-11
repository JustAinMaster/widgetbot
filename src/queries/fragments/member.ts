import gql from 'graphql-tag'

export interface Member {
  name: string
  id: string
  avatar: string
}

const member = gql`
  fragment member on Member {
    name
    id
    avatar
  }
`

export default member
