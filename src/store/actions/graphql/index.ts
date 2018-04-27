import { addNotification } from 'notify'
import { Context, BranchContext } from 'fluent'
import { request } from 'graphql-request'

import { subscribe } from 'socket-io'
import * as queries from 'queries'
import Log from 'logger'

import {
  ServerResponse,
  ChannelResponse,
  Channel
} from '../../../types/responses'
import { Notification } from 'react-notification-system'

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
        const errors = response.errors.map(error => ({
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
    let cached
    state.channels.map((channel, i) => {
      // If it's the active channel, and it has messages => cached
      if (channel.id === state.activeChannel && channel.messages) {
        cached = i
      }
    })

    if (typeof cached === 'number') {
      subscribe({
        server: state.server.id,
        channel: state.activeChannel
      })
      // Cached
      return path.success({ channel: state.channels[cached] })
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
        const errors = response.errors.map(error => ({
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
    const { channel } = props

    state.channels.map((c, i) => {
      if (c.id === channel.id) {
        state.channels[i] = {
          ...c,
          ...channel
        }
      }
    })
    console.log(props, channel)
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
