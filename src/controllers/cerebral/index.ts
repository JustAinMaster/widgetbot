import { Controller } from '@cerebral/fluent'

import * as app from '../../store'
import { Signals, State } from '../../store/types'

const development = process.env.NODE_ENV === 'development'

const controller = Controller<State, Signals>(app.module, {
  ...(development && {
    devtools: require('cerebral/devtools').default({ host: 'localhost:9000' })
  })
})

export default controller

// Debugging
if (window) {
  ;(window as any).controller = controller
  ;(window as any).state = controller.state
  ;(window as any).signals = controller.signals
}
