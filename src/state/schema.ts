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

    locale: [[String!]]!
  }

  extend type Mutation {
    closeModal: Boolean
    openModal(type: ID!, data: String): Boolean

    toggleSidebar(open: Boolean): Boolean!

    setLanguage(name: String): [[String!]]!
    setLocaleKey(key: String!, translation: String!): [[String!]]!
    removeLocaleKey(key: String!): [[String!]]!
  }
`

export default schema.replace(/extend type /g, 'type ')
