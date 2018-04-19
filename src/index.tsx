import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { ThemeProvider } from 'emotion-theming'

// Cerebral
import { Container } from '@cerebral/react'
import controller from './controllers/cerebral'

// Apollo
import { ApolloProvider } from 'react-apollo'
import client from './controllers/apollo'

import { Wrapper } from './elements'
import Messages from './components/Messages'
import registerServiceWorker from './registerServiceWorker'

class App extends React.PureComponent {
  theme = () => ({
    light: false,
    compact: false
  })

  scroll(api) {
    api.scrollToBottom()
  }

  render() {
    return (
      <ThemeProvider theme={this.theme}>
        <Wrapper innerRef={this.scroll}>
          <Messages />
        </Wrapper>
      </ThemeProvider>
    )
  }
}

ReactDOM.render(
  <Container controller={controller}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Container>,
  document.getElementById('root')
)
registerServiceWorker()

// webpack hot reloading
declare const module: any
if (module.hot) {
  module.hot.accept()
}
