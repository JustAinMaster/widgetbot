import { Container } from '@cerebral/react'
import client from 'client'
import { connect } from 'raven'
import * as React from 'react'
import { ApolloProvider } from 'react-apollo'
import * as ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import App from './app'
import ThemeProvider from './app/ThemeProvider'
import controller from './controllers/cerebral'
import registerServiceWorker from './registerServiceWorker'

// Render App
ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter basename="/channels">
      <Container controller={controller}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </Container>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root')
)

registerServiceWorker()
connect()

// Hot reloading
declare const module: any
if (module.hot) {
  module.hot.accept()
}
