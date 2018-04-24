import * as React from 'react'
import * as ReactDOM from 'react-dom'

// Router
import { BrowserRouter as Router } from 'react-router-dom'

// Cerebral
import { Container } from '@cerebral/react'
import controller from './controllers/cerebral'

import ThemeProvider from './app/ThemeProvider'
import App from './app'
import registerServiceWorker from './registerServiceWorker'

// Render App
ReactDOM.render(
  <Container controller={controller}>
    <Router>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Router>
  </Container>,
  document.getElementById('root')
)

registerServiceWorker()

// Hot reloading
declare const module: any
if (module.hot) {
  module.hot.accept()
}
