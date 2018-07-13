import gql from 'graphql-tag'

export interface Channel {
  server: {
    channel: {
      name: string
      id: string
      topic: string
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
        name
        id
        topic
      }
    }
  }
`

export default CHANNEL
