import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { ThemeProvider } from 'emotion-theming'

// Router
import { BrowserRouter as Router } from 'react-router-dom'

// Cerebral
import { Container } from '@cerebral/react'
import controller from './controllers/cerebral'

// Apollo
import { ApolloProvider } from 'react-apollo'
import client from './controllers/apollo'

import registerServiceWorker from './registerServiceWorker'
import App from './App'

// Theme context
const theme = () => ({
  light: false,
  compact: false
})

// Render App
ReactDOM.render(
  <Container controller={controller}>
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <Router>
          <App />
        </Router>
      </ThemeProvider>
    </ApolloProvider>
  </Container>,
  document.getElementById('root')
)

registerServiceWorker()

// Hot reloading
declare const module: any
if (module.hot) {
  module.hot.accept()
}
