import { addNotification } from 'notify'
import { Context, BranchContext } from 'fluent'
import { request } from 'graphql-request'
import * as _ from 'lodash'

import { subscribe } from 'socket-io'
import * as queries from 'queries'
import Log from 'logger'

import {
  ServerResponse,
  ChannelResponse,
  Channel
} from '../../../types/responses'
import { Notification } from 'react-notification-system'
import { Dictionary } from '@cerebral/fluent'

const serverIssues = {
  level: 'warning',
  title: `Server down`,
  autoDismiss: 15,
  message: 'The server is currently experiencing difficulties',
  action: {
    label: 'Try again',
    callback() {
      location.reload
    }
  }
}

namespace GraphQL {
  /**
   * Fetches a server (optionally with a selected channel)
   */
  export function fetchServer({
    state,
    props,
    path
  }: BranchContext<{
    success: ServerResponse
    error: {
      notification: Notification[]
    }
  }>) {
    const loadMessages = !!state.activeChannel

    // If a channel is selected, load it's messages
    // else just load the server info
    const variables = {
      server: state.server.id,
      ...(loadMessages
        ? {
            channel: state.activeChannel,
            withChannel: true
          }
        : {
            channel: null,
            withChannel: false
          })
    }

    Log(
      'info',
      `Fetching server`,
      state.server.id,
      ...(loadMessages ? [`with messages on channel`, state.activeChannel] : [])
    )

    return request('/api/graphql', queries.server, variables)
      .then((response: ServerResponse) => {
        if (loadMessages) {
          subscribe({
            server: state.server.id,
            channel: state.activeChannel
          })
        }

        return path.success(response)
      })
      .catch(({ response }) => {
        const errors = response
          ? response.errors.map(error => ({
              level: 'error',
              title: 'An error occured whilst loading this embed',
              message: error.message,
              autoDismiss: 0,
              action: {
                label: 'Support server',
                callback() {
                  window.open('https://discord.gg/zyqZWr2')
                }
              }
            }))
          : serverIssues

        return path.error({
          notification: errors
        })
      })
  }

  /**
   * Fetches a channel
   */
  export function fetchChannel({
    state,
    props,
    path
  }: BranchContext<{
    success: { channel: Channel }
    error: {
      notification: Notification[]
    }
  }>) {
    const channel = state.channels.get(state.activeChannel)

    if (channel.messages) {
      subscribe({
        server: state.server.id,
        channel: state.activeChannel
      })
      // Cached
      return path.success({ channel })
    }

    // Uncached
    return request('/api/graphql', queries.channel, {
      server: state.server.id,
      channel: state.activeChannel
    })
      .then((response: ChannelResponse) => {
        subscribe({
          server: state.server.id,
          channel: state.activeChannel
        })

        return path.success({
          channel: {
            id: state.activeChannel,
            ...response.server.channel
          }
        })
      })
      .catch(({ response }) => {
        const errors = response
          ? response.errors.map(error => ({
              level: 'error',
              title: 'An error occured whilst loading this embed',
              message: error.message,
              autoDismiss: 0,
              action: {
                label: 'Support server',
                callback() {
                  window.open('https://discord.gg/zyqZWr2')
                }
              }
            }))
          : serverIssues

        return path.error({
          notification: errors
        })
      })
  }

  /**
   * Updates a channel in the store
   */
  export function updateChannel({
    state,
    props
  }: Context<{ channel: Channel }>) {
    const channel = props.channel.id

    state.channels.set(channel, {
      ...state.channels.get(channel),
      name: props.channel.name,
      topic: props.channel.topic,
      messages: Dictionary(_.keyBy(props.channel.messages, 'id'))
    })
  }

  /**
   * Converts a GraphQL response into the store
   */
  export function store({ state, props }: Context<ServerResponse>) {
    const { server } = props

    if (server.name) {
      // Merge the server info
      state.server = {
        ...state.server,
        name: server.name,
        icon: server.icon,
        memberCount: server.memberCount
      }
    }

    if (server.theme) {
      state.theme = {
        ...state.theme,
        ...server.theme
      }
    }

    server.channels.forEach(channel => {
      state.channels.set(channel.id, {
        ...state.channels.get(channel.id),
        ...(channel.id === state.activeChannel
          ? {
              name: server.channel.name,
              topic: server.channel.topic,
              messages: Dictionary(_.keyBy(server.channel.messages, 'id'))
            }
          : {
              name: channel.name
            })
      })
    })
  }
}

export default GraphQL
