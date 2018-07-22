import { ComputedValue, Dictionary } from '@cerebral/fluent'
import { Emoji } from '@ui/shared/Emoji/emojiMap'

import { Translation } from '../app/locales'
import { Category } from '../types/category'
import { Member } from '../types/member'
import Message from '../types/message'
import Modal from '../types/modal'
import { Permissions } from '../types/permissions'
import { ParsedUrl } from '../types/url'
import { User } from '../types/user'
import * as signals from './sequences'

export interface Channel {
  name: string
  id: string
  category: string
  permissions: Permissions
  lastSeenID: string
  unread: boolean
  topic?: string
  messages?: Dictionary<Message>
}

export type Toggles = 'channels'

export interface State {
  screen: 'choose-channel' | 'active-channel'
  // Message loading state
  loading: boolean
  // Server info
  server: string

  // Channels that the user is subscribed to
  subscriptions: Dictionary<boolean> // TODO: Remove

  // Router url
  url: ParsedUrl

  // Custom emojis
  emojis: Dictionary<Emoji>

  // Array of channels
  channels: Dictionary<Channel>
  // Categorised channels
  categories: ComputedValue<Category[]>

  // Members for the current server
  members: Dictionary<Member>

  // Active channel ID
  activeChannel: string
  // Returns the active channel object
  channel: ComputedValue<Channel>

  // Visible UI ui
  visible: { [key in Toggles]: boolean }

  // Modal
  modal: Modal
  // User
  user: User

  // Translation
  translation: Translation
}

export type Signals = { [key in keyof typeof signals]: typeof signals[key] }
