import * as React from 'react'
import message from '../../types/message'

import { Root } from './elements'

interface Props {
  message: message
}

class Message extends React.PureComponent<Props, any> {
  render() {
    const { message } = this.props
    return <Root>{message.content}</Root>
  }
}

export default Message
