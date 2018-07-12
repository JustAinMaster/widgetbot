import { ApolloClient } from 'apollo-client'
import gql from 'graphql-tag'

import cache from './cache'
import link from './link'

const client = new ApolloClient({
  link,
  cache
})

export default client
;(window as any).client = client
;(window as any).gql = gql
