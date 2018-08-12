import { ApolloLink } from 'apollo-link'
import { BatchHttpLink } from 'apollo-link-batch-http'
import { onError } from 'apollo-link-error'
import { uncrunch } from 'graphql-crunch'

const DEVELOPMENT = process.env.NODE_ENV === 'development'

const uncruncher = new ApolloLink((operation, forward) =>
  forward(operation).map(response => {
    response.data = uncrunch(response.data)
    return response
  })
)

const httpLink = ApolloLink.from(
  [
    !DEVELOPMENT && uncruncher,
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
          console.error(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        )
      if (networkError) console.error(`[Network error]: ${networkError}`)
    }),
    new BatchHttpLink({
      uri: `/api/graphql${DEVELOPMENT ? '' : '?crunch'}`,
      batchInterval: 20
    })
  ].filter(Boolean)
)

export default httpLink
