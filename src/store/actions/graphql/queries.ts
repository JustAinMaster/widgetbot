const gql = String.raw

export const messages =
  'messages' +
  gql`
    {
      timestamp
      id
      content
      author {
        name
        id
        avatar
        bot
        color
      }
      reactions {
        id
        name
        count
      }
      mentions {
        channels {
          name
          id
        }
        members {
          name
          id
          roles {
            color
            position
            name
          }
        }
        roles {
          name
          color
          id
        }
        everyone
      }
      type
      editedAt
      attachment {
        url
        height
        width
      }
      embeds {
        color
        title
        type
        description
        url
        timestamp
        author {
          name
          url
          iconURL
        }
        fields {
          value
          name
          inline
        }
        footer {
          proxyIconUrl
          text
        }
        thumbnail {
          height
          width
          proxyURL
        }
        image {
          height
          width
          proxyURL
        }
        provider {
          name
          url
        }
        video {
          height
          width
          url
        }
      }
    }
  `

export const server = gql`
  query Messages($server: String!, $channel: String, $withChannel: Boolean!) {
    server(id: $server) {
      name
      memberCount
      icon
      channels {
        name
        id
      }
      channel(id: $channel) @include(if: $withChannel) {
        name
        topic
        ${messages}
      }
      theme {
        colors {
          primary
          accent
          background
        }
      }
    }
  }
`

export const channel = gql`
  query Messages($server: String!, $channel: String!) {
    server(id: $server) {
      channel(id: $channel) {
        name
        topic
        ${messages}
      }
      theme {
        colors {
          primary
          accent
          background
        }
      }
    }
  }
`
