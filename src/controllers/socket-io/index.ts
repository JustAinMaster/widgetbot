import { addNotification } from 'notify'
import * as io from 'socket.io-client'

import { Room } from '../../types/socket'
import controller from '../cerebral'

// Initiate socket-io
export const socket = io({ path: '/api/socket-io', autoConnect: false })

// Channel events
export const subscribe = (room: Room) => socket.emit('subscribe', room)
export const unsubscribe = (room: Room) => socket.emit('unsubscribe', room)

const initiate = () => {
  // Register socket
  socket.connect()
  socket.emit('register', { server: controller.state.server.id })

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
