import { Dictionary, ComputedValue } from '@cerebral/fluent'
import * as signals from './sequences'
import { messages } from '../types/message'

interface Channel {
  name: string
  id: string
  topic?: string
  messages?: messages
}

export type Toggles = 'channels'

export interface State {
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
  channels: Channel[]
  // Active channel ID
  activeChannel: string
  // Returns the active channel object
  channel: ComputedValue<Channel>

  // Visible UI components
  visible: {
    [key in Toggles]: boolean
  }
  // stringDictionary: Dictionary<string>
  // isAwesome: ComputedValue<boolean>
  // upperFoo: string
}

export type Signals = { [key in keyof typeof signals]: typeof signals[key] }
