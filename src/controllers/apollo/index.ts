import { ApolloClient } from 'apollo-client'
import gql from 'graphql-tag'

import cache from './cache'
import link from './link'

const client = new ApolloClient({
  link,
  cache
})

var sub = client
  .subscribe({
    query: gql`
      subscription Test {
        message {
          channel
          message {
            ... on TextMessage {
              content
            }
          }
        }
      }
    `
  })
  .subscribe(({ data }) => {
    console.warn(data)
  })

export default client
;(window as any).client = client
;(window as any).gql = gql
