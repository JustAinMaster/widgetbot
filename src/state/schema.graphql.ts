const gql = String.raw

const schema = gql`
  type Modal {
    open: Boolean!
    type: ID
    data: String
  }

  extend type Query {
    modal: Modal!
  }

  extend type Mutation {
    closeModal: Boolean
    openModal(type: ID!, data: String): Boolean
  }
`

export default schema
