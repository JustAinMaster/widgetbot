const gql = String.raw

export const server = gql`
  query Messages($server: String!) {
    server(id: $server) {
      name
      memberCount
      icon
      channels {
        name
        id
      }
    }
  }
`

export const messages = gql`
  query Messages($server: String!, $channel: String!) {
    server(id: $server) {
      name
      memberCount
      icon
      channels {
        name
        id
      }
      channel(id: $channel) {
        topic
        messages {
          timestamp
          id
          content
          author {
            name
            avatar
            bot
            color
          }
        }
      }
    }
  }
`

export const channel = gql`
  query Messages($server: String!, $channel: String!) {
    server(id: $server) {
      channel(id: $channel) {
        topic
        messages {
          timestamp
          id
          content
          author {
            name
            avatar
            bot
            color
          }
        }
      }
    }
  }
`
