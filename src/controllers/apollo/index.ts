import ApolloClient, { gql } from 'apollo-boost'
import { persistCache } from 'apollo-cache-persist'

const client = new ApolloClient({
  uri: '/api/graphql'
})

persistCache({
  cache: client.cache,
  storage: localStorage
})

export default client
;(window as any).client = client
;(window as any).gql = gql
