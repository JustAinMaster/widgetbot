import gql from 'graphql-tag'

export const SIDEBAR_VISIBILITY = gql`
  query SidebarVisibility {
    sidebar @client {
      open
    }
  }
`

export const TOGGLE_SIDEBAR = gql`
  mutation ToggleSidebar($open: Boolean) {
    toggleSidebar(open: $open) @client
  }
`
