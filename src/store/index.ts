import { Computed, Dictionary, Module } from '@cerebral/fluent'
import Router from '@cerebral/router'
import { translations } from 'locales'

import * as computed from './computed'
import * as signals from './sequences'
import { State } from './types'

const state: State = {
  screen: null,
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
  modal: {
    open: false,
    type: null,
    data: null
  },

  url: null,

  channels: Dictionary({}),
  categories: Computed(computed.categories),

  activeChannel: null,
  channel: Computed(computed.activeChannel),

  theme: {
    colors: {
      primary: '#fff',
      accent: '#7289da',
      background: '#36393E'
    },
    css: ``,
    compact: false
  },
  user: null,

  translation: translations.en
}

export const module = Module({
  state,
  signals,
  modules: {
    router: Router({
      baseUrl: '/channels',
      routes: [
        {
          path: '/:server/:channel/',
          signal: 'fetchChannel'
        },
        {
          path: '/:server/',
          signal: 'fetchServer'
        },
        {
          path: '/',
          signal: 'routeHome'
        }
      ]
    })
  }
})
