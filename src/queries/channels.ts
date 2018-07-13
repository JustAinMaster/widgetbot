import gql from 'graphql-tag'

export interface Channel {
  __typename: 'Channel'
  name: string
  category: string
  id: string
  // permissions: {
  //   SEND_MESSAGES: boolean
  // }
}
export interface Channels {
  server: {
    // emojis: Array<{ name: string; id: string }>
    channels: Channel[]
  }
}

export interface VChannels {
  server: string
}

const CHANNELS = gql`
  query Channels($server: ID!) {
    server(id: $server) {
      # emojis {
      #   name
      #   id
      # }
      channels {
        name
        category
        id
        # permissions {
        #   SEND_MESSAGES
        # }
      }
    }
  }
`

export default CHANNELS
