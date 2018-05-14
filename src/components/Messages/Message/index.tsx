import { ThemeProvider } from 'emotion-theming'
import * as React from 'react'
import { FormattedMessage } from 'react-intl'

import message from '../../../types/message'
import Author, { Timestamp } from './Author'
import {
  Avatar,
  Content,
  Group,
  JoinMember,
  JoinText,
  Markup,
  Reactions,
  Text
} from './elements'
import Markdown from './Markdown'
import parseUsername from './parseUsername'
import Reaction from './Reaction'

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

    if (message.type === 'GUILD_MEMBER_JOIN') {
      const { name } = parseUsername(message.author.name)

      return (
        <Group className="message join">
          <Content className="content">
            <JoinText>
              <FormattedMessage
                id="message.join_message"
                values={{ name: <JoinMember>{name}</JoinMember> }}
              />
            </JoinText>
            <Timestamp time={message.timestamp} />
          </Content>
        </Group>
      )
    }

    return (
      <Group className="message">
        <Avatar url={message.author.avatar} className="avatar" />
        <Content className="content">
          <Author author={message.author} time={message.timestamp} />
          <Markup className="markup">
            {messages.map(message => (
              <ThemeProvider key={message.id} theme={this.theme(message)}>
                <React.Fragment>
                  <Text className="text">{Markdown(message)}</Text>
                  {message.reactions && (
                    <Reactions className="reactions">
                      {message.reactions.map((reaction, i) => (
                        <Reaction key={i} {...reaction} />
                      ))}
                    </Reactions>
                  )}
                </React.Fragment>
              </ThemeProvider>
            ))}
          </Markup>
        </Content>
      </Group>
    )
  }
}

export default Message
