import gql from 'graphql-tag'

import embed, { Embed } from './embed'

export interface TextMessage {
  content: string
  embeds: Embed[]
}

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
