import gql from 'graphql-tag'

import embed from './embed'

const textMessage = gql`
  fragment textMessage on TextMessage {
    content
    editedAt
    reactions {
      name
      count
      id
    }
    attachment {
      url
      height
      width
    }
    embeds {
      ...embed
    }
  }

  ${embed}
`

export default textMessage
