import { withClientState } from 'apollo-link-state'

import cache from '../controllers/apollo/cache'

const gql = String.raw

const stateLink = withClientState({
  defaults: {
    router: {
      server: '299881420891881473',
      channel: '368427726358446110'
    }
  },
  typeDefs: gql`
    type Query {
      activeServer: String
      channel: Test
    }

    type Test {
      a: String
      b: String
    }
  `,
  cache,
  resolvers: {
    Query: {
      channel(...args) {
        console.log(args)
        return {
          id: 'a'
        }
      }
    },
    Mutation: {
      updateNetworkStatus: (_, { isConnected }, { cache }) => {
        const data = {
          networkStatus: {
            __typename: 'NetworkStatus',
            isConnected
          }
        }
        cache.writeData({ data })
        return cache
      }
    }
  }
})

export default stateLink
