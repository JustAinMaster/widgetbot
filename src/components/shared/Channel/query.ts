import gql from 'graphql-tag'

export interface ChannelData {
  server: {
    channel: {
      name: string
      id: string
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
      }
    }
  }
`

export default CHANNEL
