import { addNotification } from 'notify'
import * as io from 'socket.io-client'

import controller from '../cerebral'

// Initiate socket-io
export const socket = io({ path: '/api/socket-io', autoConnect: false })

export { fetchInvite } from './fetchInvite'
export { subscribe, unsubscribe } from './subscriptions'

const initiate = () => {
  // Register socket
  socket.connect()
  socket.on('connect', () => {
    socket.emit('register', {
      server: controller.state.server.id,
      token: controller.state.user.token,
      subscriptions: controller.state.subscriptions.keys()
    })
  })

  socket.on('signIn', controller.signals.signIn)

  socket.on('message', controller.signals.insertMessage)
  socket.on('messageUpdate', controller.signals.updateMessage)
  socket.on('messageDelete', controller.signals.deleteMessage)
  socket.on('messageDeleteBulk', controller.signals.deleteMessageBulk)

  socket.on('messageReactionAdd', controller.signals.messageReactionAdd)
  socket.on('messageReactionRemove', controller.signals.messageReactionRemove)

  socket.on('notify', addNotification)
}

export default initiate

// Debugging
if (window) {
  ;(window as any).socket = socket
}
