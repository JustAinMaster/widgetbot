import * as React from 'react'
import message from '../../types/message'

import Message from '../Message'
import { Root } from './elements'

interface Props {
  messages: message[]
}

class Messages extends React.PureComponent<Props, any> {
  render() {
    const { messages } = this.props

    return (
      <Root>
        {messages.map(message => (
          <Message message={message} key={message.id} />
        ))}
      </Root>
    )
  }
}

export default Messages
