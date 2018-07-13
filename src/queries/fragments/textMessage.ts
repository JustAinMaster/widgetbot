import gql from 'graphql-tag'

import embed from './embed'

const textMessage = gql`
  fragment textMessage on TextMessage {
    content
    embeds {
      ...embed
    }
  }

  ${embed}
`

export default textMessage
