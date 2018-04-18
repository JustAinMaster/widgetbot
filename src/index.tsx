declare const module: any

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'

import { Container } from './elements'
import mockData from './mockData'
import Messages from './components/Messages'

class Test extends React.Component {
  render() {
    return (
      <Container>
        <Messages messages={mockData as any} />
      </Container>
    )
  }
}

ReactDOM.render(<Test />, document.getElementById('root') as HTMLElement)
registerServiceWorker()

if (module.hot) {
  module.hot.accept()
}
