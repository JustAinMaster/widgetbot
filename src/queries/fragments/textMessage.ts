import gql from 'graphql-tag'

import embed from './embed'

const textMessage = gql`
  fragment textMessage on TextMessage {
    content
    editedAt
    embeds {
      ...embed
    }
  }

  ${embed}
`

export default textMessage
