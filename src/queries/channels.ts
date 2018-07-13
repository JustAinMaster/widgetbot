import gql from 'graphql-tag'

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
