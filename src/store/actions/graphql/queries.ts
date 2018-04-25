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
        name
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
            fields {
              value
              name
              inline
            }
            footer {
              iconURL
              proxyIconUrl
              text
            }
            thumbnail {
              height
              width
              proxyURL
              url
            }
            image {
              height
              width
              proxyURL
              url
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
            fields {
              value
              name
              inline
            }
            footer {
              iconURL
              proxyIconUrl
              text
            }
            thumbnail {
              height
              width
              proxyURL
              url
            }
            image {
              height
              width
              proxyURL
              url
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
