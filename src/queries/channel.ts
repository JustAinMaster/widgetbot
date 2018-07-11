import gql from 'graphql-tag'

import message, { Message } from './fragments/message'
import textMessage, { TextMessage } from './fragments/textMessage'

export interface Channel {
  server: {
    channel: {
      id: string
      topic: string
      messages: Message & TextMessage
    }
  }
}

export interface VChannel {
  server: string
  channel: string
}

const CHANNEL = gql`
  query Channel($server: ID!, $channel: ID!) {
    server(id: $server) {
      channel(id: $channel) {
        id
        topic
        messages {
          ... on TextMessage {
            ...message
            ...textMessage
          }
          ... on JoinMessage {
            __typename
            ...message
          }
        }
      }
    }
  }

  ${message}
  ${textMessage}
`

export default CHANNEL
