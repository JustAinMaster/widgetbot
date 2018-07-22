import { Controller } from '@cerebral/fluent'

import * as app from '../../store'
import { Signals, State } from '../../store/types'

const controller = Controller<State, Signals>(app.module, {})

export default controller

// Debugging
if (window) {
  ;(window as any).controller = controller
  ;(window as any).state = controller.state
  ;(window as any).signals = controller.signals
}
