import * as socket from 'socket.io-client'
import { message } from '../../types/socket'
import { connect } from 'fluent'

export const io = socket({
  path: '/api/socket-io',
  autoConnect: false
})

export default connect()
  .with(({ state, signals, props }) => ({
    insertMessage: signals.insertMessage,
    channel: state.channel
  }))
  .to((props): any => {
    // Connect the websocket
    io.connect()

    io.on('message', (data: message) => {
      props.insertMessage(data)
    })

    return null
  })
