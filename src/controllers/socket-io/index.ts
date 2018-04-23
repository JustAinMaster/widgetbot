import * as io from 'socket.io-client'
import { message, Room } from '../../types/socket'
import { connect } from 'fluent'

interface Props {
  addNotification: Function
}

export const socket = io({
  path: '/api/socket-io',
  autoConnect: false
})

export const subscribe = (room: Room) => socket.emit('subscribe', room)
export const unsubscribe = (room: Room) => socket.emit('unsubscribe', room)

// This is rendered as a React component
let rendered = false
export default connect<Props>()
  .with(({ state, signals, props }) => ({
    insertMessage: signals.insertMessage,
    channel: state.channel
  }))
  .to((props): any => {
    if (rendered) return null

    // Connect the websocket
    socket.connect()

    socket.on('connect', () => {
      props.addNotification({
        debug: true,
        type: 'success',
        title: 'Connected to upstream',
        message: 'Successfully connected to Socket.IO server',
        level: 'success'
      })
    })

    socket.on('message', (data: message) => {
      props.insertMessage(data)
    })

    socket.on('notify', data => {
      props.addNotification(data)
    })

    rendered = true
    return null
  })

// Debugging
if (window) {
  ;(<any>window).socket = socket
}
