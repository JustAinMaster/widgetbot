import { ThemeProvider } from 'emotion-theming'
import * as React from 'react'

import message from '../../../types/message'
import Author from './Author'
import { Avatar, Content, Group, Markup, Text } from './elements'
import Markdown from './Markdown'

interface Props {
  messages: message[]
}

class Message extends React.PureComponent<Props, any> {
  theme = message => theme => ({
    ...theme,
    message
  })

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
              <ThemeProvider key={message.id} theme={this.theme(message)}>
                <Text className="text">{Markdown(message)}</Text>
              </ThemeProvider>
            ))}
          </Markup>
        </Content>
      </Group>
    )
  }
}

export default Message
