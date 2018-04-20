import { messages } from './message'

type Channels = {
  name: string
  id: string
}[]

export interface Channel {
  name: string
  topic?: string
  id?: string
  messages?: messages
}

export interface ServerResponse {
  server: {
    name: string
    memberCount: number
    icon: string
    channels: Channels
    channel?: Channel
  }
}

export interface ChannelResponse {
  server: {
    channel: Channel
  }
}
