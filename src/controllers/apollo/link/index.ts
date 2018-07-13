import { split } from 'apollo-link'
import { createPersistedQueryLink } from 'apollo-link-persisted-queries'
import { RetryLink } from 'apollo-link-retry'
import { getMainDefinition } from 'apollo-utilities'

import httpLink from './http'
import wsLink from './websocket'

const retryLink = new RetryLink({
  attempts: {
    max: 300
  },
  delay: {
    initial: 200
  }
})
const persistedLink = createPersistedQueryLink()

const link = persistedLink.concat(
  retryLink.concat(
    split(
      ({ query }) => {
        const { kind, operation } = getMainDefinition(query) as any

        return kind === 'OperationDefinition' && operation === 'subscription'
      },
      wsLink,
      httpLink
    )
  )
)

export default link
