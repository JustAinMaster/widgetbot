import * as React from 'react'
import message from '../../types/message'

import { Group, Avatar, Content, Text } from './elements'
import Author from './Author'

interface Props {
  message: message
}

class Message extends React.PureComponent<Props, any> {
  render() {
    const { message } = this.props
    console.log(message)

    return (
      <Group>
        <Avatar url={message.author.avatar} />
        <Content>
          <Author author={message.author} />
          <Text>{message.content}</Text>
        </Content>
      </Group>
    )
  }
}

export default Message
