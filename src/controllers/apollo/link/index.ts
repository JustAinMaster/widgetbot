import { split } from 'apollo-link'
import { getMainDefinition } from 'apollo-utilities'

import httpLink from './http'
import wsLink from './websocket'

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query) as any
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  httpLink
)

export default link
