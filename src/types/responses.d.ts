import { Theme_server_theme } from '../app/__generated__/Theme'
import { Channel } from '../store/types'
import Message from './message'
import { Permissions } from './permissions'

type Channels = {
  name: string
  unread: boolean
  id: string
  category: string
  permissions: Permissions
}[]

export interface ChannelResponse {
  server: {
    channel: Channel & { messages: Message[] }
  }
}

export type Member = {
  tag: string
  id: string
  avatar: string
  status: string
  roles: string[]
}

export type Emoji = {
  name: string
  id: string
}

export interface ServerResponse {
  server: {
    name: string
    memberCount: number
    icon: string
    theme: Theme_server_theme

    emoji?: Emoji[]

    channels: Channels
    channel?: ChannelResponse['server']['channel']

    members?: Member[]
  }
}
