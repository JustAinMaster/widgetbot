import * as React from 'react'
import { Message } from '../../types/message'

interface Props {
  data: Message[]
}

class Messages extends React.PureComponent<Props, any> {
  render() {
    console.log(this.props.data)
    return <span>MESSAGES</span>
  }
}

export default Messages
