import { BranchContext, Context } from 'fluent'
import Log from 'logger'
import { addNotification } from 'notify'
import { Notification } from 'react-notification-system'
import { socket } from 'socket-io'

import Message from '../../types/message'
import Modal from '../../types/modal'
import { message } from '../../types/socket'
import { User } from '../../types/user'
import { Toggles } from '../types'
import { State } from './../types'

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
  props,
  path
}: BranchContext<
  {
    // sending: message
    sending: any
  },
  { channel: string; message: string }
>) {
  socket.emit(
    'sendMessage',
    {
      server: state.server.id,
      ...props
    },
    (message: Message) => {}
  )

  return path.sending({
    // channel: props.channel,
    // message: {
    //   content: props.message,
    //   timestamp: +new Date(),
    //   attachment: null,
    //   id: 'a',
    //   type: 'DEFAULT',
    //   mentions: ,
    //   reactions: [],
    //   embeds: [],
    //   editedAt: null,
    //   author: {
    //     name: 'test',
    //     id: 'asdsadasd',
    //     avatar: null,
    //     bot: false,
    //     color: '#fff',
    //     discriminator: 'a',
    //     roles: null
    //   }
    // }
  })
}

/**
 * Authentication actions
 */
let resolvees: Function[] = []
export async function signIn({
  state,
  props,
  path
}: BranchContext<{
  complete: {
    user: User
  }
  interrupted: {
    error: string
  }
}>) {
  if (!state.user) {
    state.modal = {
      ...state.modal,
      open: true,
      type: 'authenticate'
    }

    // The position in the resolvees array
    let que: number

    let timer
    try {
      // Become a resolvee for once the user is signed in
      // Execution is gracefully stopped until this is complete
      const user = (await new Promise((resolve, reject) => {
        que = resolvees.push(resolve) - 1

        // Check to make sure the user hasn't closed the dialog
        timer = setInterval(() => {
          if (!state.modal.open || state.modal.type !== 'authenticate') {
            // If they've closed it, reject the promise and go down
            // the interrupted path
            reject(`You need to sign in to send messages`)
          }
        }, 500)
      })) as User

      clearInterval(timer)

      return path.complete({ user })
    } catch (error) {
      clearInterval(timer)

      // Remove the resolver from the resolvees array
      resolvees.splice(que, 1)

      // User declined to sign in /
      // Something went wrong
      return path.interrupted({ error })
    }
  }

  return path.complete({ user: state.user })
}

export function createAccount({ state, props }: Context<{ name: string }>) {
  socket.emit('signIn', props, user => {
    state.user = {
      ...state.user,
      ...user
    }

    // Resolve resolvee sequences
    if (resolvees.length) {
      resolvees.forEach(resolve => resolve(state.user))
    }
  })
}

export function singleSignOn({ state, props }: Context) {
  console.log('single sign on')
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

export const loading = (status: boolean) => ({ state, props }: Context) => {
  state.loading = status
}

/**
 * Interactive actions
 */
export function closeDrawerOnMobile({ state, props }: Context) {
  if (window.innerWidth < 520) {
    state.visible.channels = false
  }
}

export function toggle({ state, props }: Context<{ component: Toggles }>) {
  state.visible[props.component] = !state.visible[props.component]
}

export function modal({
  state,
  props
}: Context<{ open: boolean; type?: Modal['type']; data?: Modal['data'] }>) {
  state.modal = { ...state.modal, ...props }
}

export function switchScreen(screen: State['screen']) {
  return ({ state, props }: Context) => {
    state.screen = screen
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
