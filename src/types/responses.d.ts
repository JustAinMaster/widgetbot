import { messages } from './message'
import { Theme } from '../store/types'

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
    theme: Theme
    channels: Channels
    channel?: Channel
  }
}

export interface ChannelResponse {
  server: {
    channel: Channel
  }
}
