import * as React from 'react'
import { toHTML as markdown } from 'discord-markdown'
import message from '../../types/message'

import { Group, Avatar, Content, Markup } from './elements'
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
          <Author author={message.author} time={message.timestamp} />
          <Markup
            dangerouslySetInnerHTML={{ __html: markdown(message.content) }}
          />
        </Content>
      </Group>
    )
  }
}

export default Message
