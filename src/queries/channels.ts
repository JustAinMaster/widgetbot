import gql from 'graphql-tag'

export interface Channels {
  server: {
    emojis: Array<{ name: string; id: string }>
    channels: Array<{
      name: string
      category: string
      id: string
      permissions: {
        SEND_MESSAGES: boolean
      }
    }>
  }
}

export interface VChannels {
  server: string
}

const CHANNELS = gql`
  query Channels($server: ID!) {
    server(id: $server) {
      emojis {
        name
        id
      }
      channels {
        name
        category
        id
        permissions {
          SEND_MESSAGES
        }
      }
    }
  }
`

export default CHANNELS
