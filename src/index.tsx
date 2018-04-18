declare const module: any

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { ThemeProvider } from 'emotion-theming'
import registerServiceWorker from './registerServiceWorker'

import { Container } from './elements'
import mockData from './mockData'
import Messages from './components/Messages'

class Test extends React.Component {
  theme = () => ({
    compact: false
  })

  render() {
    return (
      <ThemeProvider theme={this.theme}>
        <Container>
          <Messages messages={mockData as any} />
        </Container>
      </ThemeProvider>
    )
  }
}

ReactDOM.render(<Test />, document.getElementById('root') as HTMLElement)
registerServiceWorker()

if (module.hot) {
  module.hot.accept()
}
