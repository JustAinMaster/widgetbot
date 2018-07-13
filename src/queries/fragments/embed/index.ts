import gql from 'graphql-tag'

const embed = gql`
  fragment embed on Embed {
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
`

export default embed
