import { Dictionary } from '@cerebral/fluent'
import client from 'client'
import { BranchContext, Context } from 'fluent'
import * as _ from 'lodash'
import Log from 'logger'
import CHANNEL, { Channel } from 'queries/channel'
import CHANNELS, { Channels } from 'queries/channels'
import { Notification } from 'react-notification-system'
import { subscribe } from 'socket-io'

import parseUsername from '../../components/Messages/Message/parseUsername'
import { ServerResponse } from '../../types/responses'
import { Channel as $Channel } from '../types'
import { getLast } from './util'

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
      server: state.server,
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
      state.server,
      ...(loadMessages ? [`with messages on channel`, state.activeChannel] : [])
    )

    try {
      const response = await client.query<Channels>({
        query: CHANNELS,
        variables
      })

      if (loadMessages) {
        subscribe(state.activeChannel)
      }

      // TODO: Fix
      console.log(response.data)

      return path.success(response.data as any)
    } catch ({ response }) {
      // TODO: Fix error catching for apollo
      const errors =
        response && response.errors
          ? response.errors.map(error => ({
              level: 'error',
              title: 'An error occured whilst loading this embed',
              message: error.message,
              autoDismiss: 0
            }))
          : serverIssues

      return path.error({ notification: errors })
    }
  }

  /**
   * Fetches a channel
   */
  export async function fetchChannel({
    state,
    props,
    path
  }: BranchContext<{
    success: { channel: $Channel }
    error: {
      notification: Notification[]
    }
  }>) {
    const channel = state.channels.get(state.activeChannel)

    if (channel && channel.messages) {
      subscribe(state.activeChannel)
      // Cached
      return path.success({ channel })
    }

    // Uncached
    try {
      const { data } = await client.query<Channel>({
        query: CHANNEL,
        variables: {
          server: state.server,
          channel: state.activeChannel
        }
      })

      subscribe(state.activeChannel)

      // TODO: Fix
      console.log(data)

      return path.success({
        channel: {
          id: state.activeChannel,
          ...data.server.channel,
          messages: Dictionary(
            {} /*_.keyBy(data.server.channel.messages, 'id')*/
          )
        }
      } as any)
    } catch ({ response }) {
      const errors =
        response && response.errors
          ? response.errors.map(error => ({
              level: 'error',
              title: 'An error occured whilst loading this embed',
              message: error.message,
              autoDismiss: 0
            }))
          : serverIssues

      return path.error({ notification: errors })
    }
  }

  /**
   * Updates a channel in the store
   */
  export function updateChannel({
    state,
    props
  }: Context<{ channel: $Channel }>) {
    const channel = props.channel.id
    const prev = state.channels.get(channel)

    state.channels.set(channel, {
      ...prev,
      lastSeenID: getLast(props.channel.messages.values()),
      name: props.channel.name,
      topic: props.channel.topic,
      messages: props.channel.messages,
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

    if (server.members) {
      const members = server.members.map(member => {
        const { name, discriminator } = parseUsername(member.tag)
        return [
          member.id,
          {
            name,
            tag: member.tag,
            discriminator,

            id: member.id,
            avatarURL: member.avatar
              ? `https://cdn.discordapp.com/avatars/${member.id}/${
                  member.avatar
                }.png?size=64`
              : `https://cdn.discordapp.com/embed/avatars/0.png`,

            roles: member.roles,
            status: member.status
          }
        ]
      })

      state.members.merge(members)
    }

    if (server.emoji) {
      const emoji = server.emoji.map(({ id, name }) => [
        id,
        {
          category: 'custom',
          emoji: id,
          keywords: [name]
        }
      ])

      state.emojis.merge(emoji)
    }

    if (server.channel && server.channels) {
      const channels = server.channels.map(channel => [
        channel.id,
        {
          unread: false,
          lastSeenID: null,
          ...(state.channels.get(channel.id) as any),
          ...(channel.id === state.activeChannel
            ? {
                lastSeenID: getLast(server.channel.messages),
                ...channel,
                ...server.channel,
                messages: Dictionary(_.keyBy(server.channel.messages, 'id'))
              }
            : channel)
        }
      ])

      state.channels.merge(channels)
    }
  }
}

export default GraphQL
