import 'babel-polyfill'

import client from '@lib/apollo'
import { connect } from '@lib/sentry'
import * as React from 'react'
import { ApolloProvider } from 'react-apollo'
import * as ReactDOM from 'react-dom'
import { I18nProvider } from '@lingui/react'
import { BrowserRouter } from 'react-router-dom'

import App from './app'
import registerServiceWorker from './registerServiceWorker'

// Render App
ReactDOM.render(
  <I18nProvider language="en">
    <ApolloProvider client={client}>
      <BrowserRouter basename="/channels">
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </I18nProvider>,
  document.getElementById('root')
)

registerServiceWorker()
connect()

// Hot reloading
declare const module: any
if (module.hot) {
  module.hot.accept()
}
