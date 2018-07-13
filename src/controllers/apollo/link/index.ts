import { ApolloLink, split } from 'apollo-link'
import apolloLogger from 'apollo-link-logger'
import { createPersistedQueryLink } from 'apollo-link-persisted-queries'
import { RetryLink } from 'apollo-link-retry'
import { getMainDefinition } from 'apollo-utilities'

import httpLink from './http'
import wsLink from './websocket'

const link = ApolloLink.from([
  apolloLogger,
  new RetryLink({
    attempts: {
      max: 300
    },
    delay: {
      initial: 200
    }
  }),
  createPersistedQueryLink(),
  split(
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query) as any

      return kind === 'OperationDefinition' && operation === 'subscription'
    },
    wsLink,
    httpLink
  )
])

export default link
