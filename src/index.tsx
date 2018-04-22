import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { ThemeProvider } from 'emotion-theming'

// Router
import { BrowserRouter as Router } from 'react-router-dom'

// Cerebral
import { Container } from '@cerebral/react'
import controller from './controllers/cerebral'

import App from './app'
import { defaultTheme } from 'typed-emotion'
import registerServiceWorker from './registerServiceWorker'

// Render App
ReactDOM.render(
  <Container controller={controller}>
    <ThemeProvider theme={defaultTheme}>
      <Router>
        <App />
      </Router>
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
