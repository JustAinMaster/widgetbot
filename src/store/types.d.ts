import { Dictionary, ComputedValue } from '@cerebral/fluent'
import * as signals from './sequences'
import Message from '../types/message'
import Modal from '../types/modal'

interface Channel {
  name: string
  topic?: string
  messages?: Dictionary<Message>
}

export type Toggles = 'channels'

export interface Theme {
  colors: {
    primary: string
    accent: string
    background: string
  }
  compact: boolean
  light: boolean
}

export interface State {
  screen: 'choose-channel' | 'active-channel'
  // Message loading state
  loading: boolean
  // Server info
  server: {
    name: string
    id: string
    memberCount: number
    icon: string
  }
  // Array of channels
  channels: Dictionary<Channel>
  // Active channel ID
  activeChannel: string
  // Returns the active channel object
  channel: ComputedValue<Channel>

  // Visible UI components
  visible: { [key in Toggles]: boolean }
  // Theme
  theme: Theme

  // Modal
  modal: Modal
}

export type Signals = { [key in keyof typeof signals]: typeof signals[key] }
