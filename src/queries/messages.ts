import gql from 'graphql-tag'

import message from './fragments/message'
import textMessage from './fragments/textMessage'

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

export const MESSAGE_SUBSCRIPTION = gql`
  subscription NewMessages($server: ID!, $channel: ID!) {
    message(filter: { server: $server, channel: $channel }) {
      message {
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

  ${message}
  ${textMessage}
`

export default MESSAGES
