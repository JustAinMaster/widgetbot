import Message from './message'
import { Theme } from '../store/types'
import { Dictionary } from '@cerebral/fluent'

type Channels = {
  name: string
  id: string
}[]

export interface Channel {
  name: string
  topic?: string
  id?: string
  messages?: Dictionary<Message>
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
