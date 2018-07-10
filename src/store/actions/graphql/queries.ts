import gql from 'graphql-tag'

// export const messages =
//   'messages' +
//   gql`
//     {
//       timestamp
//       id
//       content
//       author {
//         name
//         id
//         avatar
//         type
//         color
//       }
//       reactions {
//         id
//         name
//         count
//       }
//       mentions {
//         members {
//           name
//           id
//           roles {
//             color
//             position
//             name
//           }
//         }
//         roles {
//           name
//           color
//           id
//         }
//         everyone
//       }
//       type
//       editedAt
//       attachment {
//         url
//         height
//         width
//       }
//       embeds {
//         color
//         title
//         type
//         description
//         url
//         timestamp
//         author {
//           name
//           url
//           iconURL
//         }
//         fields {
//           value
//           name
//           inline
//         }
//         footer {
//           proxyIconUrl
//           text
//         }
//         thumbnail {
//           height
//           width
//           proxyURL
//         }
//         image {
//           height
//           width
//           proxyURL
//         }
//         provider {
//           name
//           url
//         }
//         video {
//           height
//           width
//           url
//         }
//       }
//     }
//   `

const member = gql`
  fragment member on IMember {
    name
    id
    avatar
  }
`

const message = gql`
  fragment message on IMessage {
    id
    timestamp
    author {
      ... on ListedMembers {
        id
      }
      ... on UnlistedMembers {
        ...member
      }
    }
  }
  ${member}
`

const textMessage = gql`
  fragment textMessage on TextMessage {
    content
    embeds {
      title
      description
      url
      timestamp
      color
      fields {
        value
        name
        inline
      }
      footer {
        iconURL
        proxyIconURL
        text
      }
      thumbnail {
        height
        width
        proxyURL
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
  query Messages($server: ID!) {
    server(id: $server) {
      name
      memberCount
      icon
      emojis {
        name
        id
      }
      theme {
        colors {
          primary
          accent
          background
        }
        css
      }
    }
  }
`

export const members = gql`
  query Messages($server: ID!) {
    server(id: $server) {
      members {
        ...member
      }
    }
  }
  ${member}
`

export const channels = gql`
  query Messages($server: ID!, $channel: ID!, $withChannel: Boolean!) {
    server(id: $server) {
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

export const channel = gql`
  query Messages($server: ID!, $channel: ID!) {
    channel(id: $channel) {
      id
      topic
      messages {
        ... on TextMessage {
          ...message
          ...textMessage
        }
        ... on JoinMessage {
          __typename
          ...message
        }
      }
    }
  }

  ${message}
  ${textMessage}
`

export const server_ = gql`
  query Messages($server: String!, $channel: String, $withChannel: Boolean!) {
    server(id: $server) {
      name
      memberCount
      icon
      members {
        tag
        id
        status
        avatar
      }
      emoji {
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
      channel(id: $channel) @include(if: $withChannel) {
        topic
      }
      theme {
        colors {
          primary
          accent
          background
        }
        css
      }
    }
  }
`

export const channel_ = gql`
  query Messages($server: String!, $channel: String!) {
    server(id: $server) {
      channel(id: $channel) {
        name
        topic
      }
    }
  }
`
