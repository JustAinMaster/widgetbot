import gql from 'graphql-tag'

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
