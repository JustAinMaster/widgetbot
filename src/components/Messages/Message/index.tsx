import * as React from 'react'
import message from '../../../types/message'

import { Group, Avatar, Content, Markup, Text } from './elements'
import Author from './Author'

interface Props {
  messages: message[]
}

class Message extends React.PureComponent<Props, any> {
  render() {
    const { messages } = this.props
    const [message] = messages

    return (
      <Group>
        <Avatar url={message.author.avatar} />
        <Content>
          <Author author={message.author} time={message.timestamp} />
          <Markup>
            {messages.map(message => (
              <Text
                dangerouslySetInnerHTML={{ __html: message.content }}
                key={message.id}
              />
            ))}
          </Markup>
        </Content>
      </Group>
    )
  }
}

export default Message
