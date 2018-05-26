import { Dictionary } from '@cerebral/fluent'
import { BranchContext, Context } from 'fluent'
import { request } from 'graphql-request'
import * as _ from 'lodash'
import Log from 'logger'
import * as queries from 'queries'
import { Notification } from 'react-notification-system'
import { subscribe } from 'socket-io'

import {
  Channel,
  ChannelResponse,
  ServerResponse
} from '../../../types/responses'

const serverIssues = {
  level: 'warning',
  title: `Server down`,
  autoDismiss: 0,
  message: 'The server is currently experiencing difficulties',
  action: {
    label: 'Try again',
    callback() {
      location.reload()
    }
  }
}

namespace GraphQL {
  /**
   * Fetches a server (optionally with a selected channel)
   */
  export async function fetchServer({
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

    try {
      const response = (await request(
        '/api/graphql',
        queries.server,
        variables
      )) as ServerResponse

      if (loadMessages) {
        subscribe(state.activeChannel)
      }

      return path.success(response)
    } catch ({ response }) {
      const errors =
        response && response.errors
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

      return path.error({ notification: errors })
    }
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
      subscribe(state.activeChannel)
      // Cached
      return path.success({ channel })
    }

    // Uncached
    return request('/api/graphql', queries.channel, {
      server: state.server.id,
      channel: state.activeChannel
    })
      .then((response: ChannelResponse) => {
        subscribe(state.activeChannel)

        return path.success({
          channel: {
            id: state.activeChannel,
            ...response.server.channel
          }
        })
      })
      .catch(({ response }) => {
        const errors =
          response && response.errors
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
    const prev = state.channels.get(channel)

    state.channels.set(channel, {
      ...prev,
      name: props.channel.name,
      topic: props.channel.topic,
      messages: Dictionary(_.keyBy(props.channel.messages, 'id')),
      permissions: {
        ...(prev && prev.permissions),
        ...props.channel.permissions
      }
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
        invite: server.invite,
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
        unread: false,
        ...(state.channels.get(channel.id) as any),
        ...(channel.id === state.activeChannel
          ? {
              ...channel,
              ...server.channel,
              messages: Dictionary(_.keyBy(server.channel.messages, 'id'))
            }
          : channel)
      })
    })
  }
}

export default GraphQL
