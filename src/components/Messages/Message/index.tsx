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
  Sys,
  Text
} from './elements'
import Markdown from './Markdown'
import parseUsername from './parseUsername'
import Reaction from './Reaction'

interface Props {
  messages: message[]
  lastSeen: string
}

class Message extends React.PureComponent<Props, any> {
  theme = message => theme => ({
    ...theme,
    message
  })

  render() {
    const { messages, lastSeen } = this.props
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
            {messages.map((message, i) => (
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

                  {// If the message is the last one seen by the user
                  message.id === lastSeen &&
                    // And it's not at the end of the list
                    i !== messages.length - 1 && (
                      <Sys.Container className="system-message">
                        <Sys.Lines>
                          <Sys.Message>New Messages</Sys.Message>
                        </Sys.Lines>
                      </Sys.Container>
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
