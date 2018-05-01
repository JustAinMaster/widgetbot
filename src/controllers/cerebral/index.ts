import { Controller } from '@cerebral/fluent'
import Devtools from 'cerebral/devtools'

import * as app from '../../store'

const controller = Controller(app.module, {
  devtools: Devtools({ host: 'localhost:9000' }) // process.env.NODE_ENV
})

export default controller
