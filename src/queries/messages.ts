import gql from 'graphql-tag'

import message, { Message } from './fragments/message'
import textMessage, { TextMessage } from './fragments/textMessage'

export type UMessage = Message & (TextMessage | ({ __typename: 'JoinMessage' }))

export interface Messages {
  server: {
    channel: {
      id: string
      messages: UMessage[]
    }
  }
}

export interface VMessages {
  server: string
  channel: string
}

const MESSAGES = gql`
  query Messages($server: ID!, $channel: ID!) {
    server(id: $server) {
      channel(id: $channel) {
        id
        messages {
          ... on TextMessage {
            ...message
            ...textMessage
          }
          ... on JoinMessage {
            ...message
          }
        }
      }
    }
  }

  ${message}
  ${textMessage}
`

export default MESSAGES
