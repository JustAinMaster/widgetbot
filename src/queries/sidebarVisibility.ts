import gql from 'graphql-tag'

const SIDEBAR_VISIBILITY = gql`
  query SidebarVisibility {
    sidebar @client {
      open
    }
  }
`

export default SIDEBAR_VISIBILITY
