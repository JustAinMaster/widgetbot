import * as socket from 'socket.io-client'

export const io = socket({
  path: '/api/socket-io'
})
