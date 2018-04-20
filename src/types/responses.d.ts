import { messages } from './message'

interface Channel {
  name: string
  id: string
}

export interface ServerResponse {
  server: {
    name: string
    memberCount: number
    icon: string
    channels: Channel[]
    channel?: {
      name: string
      topic: string
      messages: messages
    }
  }
}
