import Message from './message'

export interface message {
  channel: string
  message: Message
}

export interface Room {
  server: string
  channel: string
}
