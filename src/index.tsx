import { Container } from '@cerebral/react'
import controller from '@lib/cerebral'
import { connect } from '@lib/sentry'
import client from 'client'
import * as React from 'react'
import { ApolloProvider } from 'react-apollo'
import * as ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import App from './app'
import registerServiceWorker from './registerServiceWorker'

// Render App
ReactDOM.render(
  <ApolloProvider client={client}>
    <Container controller={controller}>
      <BrowserRouter basename="/channels">
        <App />
      </BrowserRouter>
    </Container>
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
