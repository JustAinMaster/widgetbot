import * as React from 'react'

import message from '../../../types/message'
import Author from './Author'
import { Avatar, Content, Edited, Group, Markup, Text } from './elements'
import Markdown from './Markdown'

interface Props {
  messages: message[]
}

class Message extends React.PureComponent<Props, any> {
  render() {
    const { messages } = this.props
    const [message] = messages

    return (
      <Group className="message">
        <Avatar url={message.author.avatar} className="avatar" />
        <Content className="content">
          <Author author={message.author} time={message.timestamp} />
          <Markup className="markup">
            {messages.map(message => (
              <Text key={message.id} className="text">
                {Markdown(message)}
                {message.editedAt && (
                  <Edited className="edited">{`(edited)`}</Edited>
                )}
              </Text>
            ))}
          </Markup>
        </Content>
      </Group>
    )
  }
}

export default Message
