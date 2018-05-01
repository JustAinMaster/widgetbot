import { Container } from '@cerebral/react'
import * as React from 'react'
import * as ReactDOM from 'react-dom'

import App from './app'
import ThemeProvider from './app/ThemeProvider'
import controller from './controllers/cerebral'
import registerServiceWorker from './registerServiceWorker'


// Render App
ReactDOM.render(
  <Container controller={controller}>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </Container>,
  document.getElementById('root')
)

registerServiceWorker()

// Hot reloading
declare const module: any
if (module.hot) {
  module.hot.accept()
}
