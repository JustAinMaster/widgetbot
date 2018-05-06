import { Controller } from '@cerebral/fluent'
import Devtools from 'cerebral/devtools'

import * as app from '../../store'

const development =
  process.env.NODE_ENV === 'development' || /localhost/.test(location.host)

const controller = Controller(app.module, {
  ...(development ? { devtools: Devtools({ host: 'localhost:9000' }) } : {})
})

export default controller
