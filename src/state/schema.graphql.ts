const gql = String.raw

const schema = gql`
  interface Modal {
    open: Boolean!
  }

  type ImageModal implements Modal {
    open: Boolean!
    url: String
  }

  type SettingsModal implements Modal {
    open: Boolean!
    screen: String!
  }

  extend type Query {
    modal: Modal
  }

  type Mutation {
    hideModal: Boolean
    showModal(type: String!, data: String): Boolean
  }
`

export default schema
