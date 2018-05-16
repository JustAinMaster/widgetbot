import { socket } from 'socket-io'

import { Room } from '../../types/socket'

export const subscribe = (room: Room) => socket.emit('subscribe', room)
export const unsubscribe = (room: Room) => socket.emit('unsubscribe', room)
