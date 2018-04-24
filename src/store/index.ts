import { Module, Dictionary, Computed } from '@cerebral/fluent'
import { State } from './types'
import * as signals from './sequences'
import * as computed from './computed'

const state: State = {
  loading: true,
  server: {
    name: null,
    icon: null,
    id: null,
    memberCount: null
  },
  visible: {
    channels: window.innerWidth > 520
  },
  channels: null,
  activeChannel: null,
  channel: Computed(computed.activeChannel),
  theme: {
    colors: {
      primary: '#fff',
      accent: '#7289da',
      background: '#36393E'
    },
    light: false,
    compact: false
  }
}

export const module = Module({
  state,
  signals
})
