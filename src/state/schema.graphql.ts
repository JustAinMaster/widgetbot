const gql = String.raw

const schema = gql`
  type Modal {
    open: Boolean!
    type: ID
    data: String
  }

  type Sidebar {
    open: Boolean!
  }

  extend type Query {
    modal: Modal!
    sidebar: Sidebar!
  }

  extend type Mutation {
    closeModal: Boolean
    openModal(type: ID!, data: String): Boolean

    toggleSidebar(open: Boolean): Boolean!
  }
`

export default schema
