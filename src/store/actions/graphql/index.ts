import { Context, BranchContext } from 'fluent'
import { request } from 'graphql-request'

import * as queries from 'queries'
import Log from 'logger'

import { ServerResponse } from '../../../types/responses'

namespace GraphQL {
  export function fetch({
    state,
    props,
    path
  }: BranchContext<{
    success: ServerResponse
    error: {}
  }>) {
    const loadMessages = !!state.activeChannel

    // If a channel is selected, load it's messages
    // else just load the server info
    const query = loadMessages ? queries.messages : queries.server
    const variables = {
      server: state.server.id,
      ...(loadMessages ? { channel: state.activeChannel } : {})
    }

    return request('/api', query, variables)
      .then((response: ServerResponse) => path.success(response))
      .catch(() => path.error({}))
  }

  export function store({ state, props }: Context<ServerResponse>) {
    const { server } = props

    // Merge the server info
    state.server = {
      ...state.server,
      name: server.name,
      icon: server.icon,
      memberCount: server.memberCount
    }

    // Map the channels and merge the messages
    state.channels = server.channels.map((channel, i) => {
      if (channel.id === state.activeChannel) {
        return {
          ...channel,
          ...server.channel
        }
      }
      return channel
    })
  }
}

export default GraphQL
