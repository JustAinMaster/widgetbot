import * as R from 'ramda'
import { ClientStateConfig } from 'apollo-link-state'

const capitalize = R.compose(
  R.join(''),
  R.juxt([
    R.compose(
      R.toUpper,
      R.head
    ),
    R.tail
  ])
)

const gql = String.raw

const modal: ClientStateConfig = {
  defaults: {
    modal: {
      open: false,
      __typename: 'Modal'
    }
  },
  resolvers: {
    Mutation: {
      showModal(_, {}, { cache }) {
        const data = { open: true, __typename: 'Modal' }
        cache.writeData({ id: '$ROOT_QUERY.modal', data })
        return null
      },

      hideModal(_, __, { cache }) {
        const data = { open: false, __typename: 'Modal' }
        cache.writeData({ id: '$ROOT_QUERY.modal', data })
        return null
      }
    }
  }
}

export default modal
