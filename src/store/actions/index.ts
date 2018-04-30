import { addNotification } from 'notify'
import { State } from './../types'
import { Context, BranchContext } from 'fluent'
import Log from 'logger'
import { socket } from 'socket-io'

import { Channel } from '../../types/responses'
import { Toggles } from '../types'
import { message } from '../../types/socket'
import { Notification } from 'react-notification-system'
import Modal from '../../types/modal'

/**
 * Selects a server (and or) channel and returns a branch
 * from whether the selected server / channel is already cached
 */
export function select({
  state,
  props,
  path
}: BranchContext<
  {
    cached: boolean
    uncached: boolean
  },
  { server?: string; channel?: string }
>) {
  let cached = false

  // If the server field has an icon entry, it's cached
  if (props.server) {
    state.server.id = props.server
    cached = !!state.server.icon
  }

  // Marks a channel as selected
  // If the channels array contains the selected channel ID
  // and contains the messages field, then it's cached
  if (props.channel) {
    state.activeChannel = props.channel

    const channel = state.channels.get(props.channel)
    if (channel && channel.messages) {
      cached = true
    } else {
      cached = false
    }
  }

  Log('warn', `Selected`, props, cached ? `from cache` : `from network`)
  return cached ? path.cached(true) : path.uncached(true)
}

/**
 * Message actions
 */
export function setMessage({ state, props }: Context<message>) {
  const channel = state.channels.get(props.channel)

  if (channel && channel.messages) {
    channel.messages.set(props.message.id, props.message)
  }
}

export function sendMessage({
  state,
  props
}: Context<{ channel: string; message: string }>) {
  socket.emit('sendMessage', {
    server: state.server.id,
    ...props
  })
}

/**
 * General actions
 */
export function notify({
  state,
  props
}: Context<{ notification: Notification | Notification[] }>) {
  addNotification(props.notification)
}

export function closeDrawerOnMobile({ state, props }: Context) {
  if (window.innerWidth < 520) {
    state.visible.channels = false
  }
}

export function loading(status: boolean) {
  return ({ state, props }: Context) => {
    state.loading = status
  }
}

export function switchScreen(screen: State['screen']) {
  return ({ state, props }: Context) => {
    state.screen = screen
  }
}

export function toggle({ state, props }: Context<{ component: Toggles }>) {
  state.visible[props.component] = !state.visible[props.component]
}

export function modal({
  state,
  props
}: Context<{ open: boolean; type?: Modal['type']; data?: Modal['data'] }>) {
  state.modal = {
    ...state.modal,
    ...props
  }
}

export function typing({
  state,
  props
}: Context<{ channel: string; typing: boolean }>) {
  socket.emit('typing', {
    server: state.server.id,
    ...props
  })
}

export { default as GraphQL } from './graphql'
