import { Messages_server_channel_messages } from '@queries/__generated__/Messages'
import Markdown from '@ui/shared/markdown/render'
import { ThemeProvider } from 'emotion-theming'
import Moment from 'moment'
import Tooltip from 'rc-tooltip'
import * as React from 'react'
import { FormattedMessage } from 'react-intl'

import Author, { Timestamp } from './Author'
import {
  Avatar,
  Content,
  Edited,
  Group,
  JoinMember,
  JoinText,
  Messages,
  Reactions,
  Root
} from './elements'
import { Image } from './Embed/elements/media'
import parseUsername from './parseUsername'
import Reaction from './Reaction'

interface Props {
  messages: Messages_server_channel_messages[]
  style?
}

class Message extends React.PureComponent<Props, any> {
  theme = message => theme => ({
    ...theme,
    message
  })

  render() {
    const { messages } = this.props
    const [firstMessage] = messages

    return (
      <Group style={this.props.style} className="group">
        {firstMessage.__typename !== 'JoinMessage' ? (
          <Avatar url={firstMessage.author.avatarURL} className="avatar" />
        ) : null}

        <Messages className="messages">
          {firstMessage.__typename !== 'JoinMessage' ? (
            <Author
              author={firstMessage.author}
              time={firstMessage.timestamp}
            />
          ) : null}

          {messages.map((message, i) => {
            switch (message.__typename) {
              case 'TextMessage': {
                return (
                  <ThemeProvider key={message.id} theme={this.theme(message)}>
                    <Root className="message" id={message.id}>
                      <Content className="content">
                        <Markdown>{message.content}</Markdown>
                        {message.editedAt && (
                          <Tooltip
                            placement="top"
                            overlay={Moment(message.editedAt).calendar()}
                            mouseLeaveDelay={0}
                          >
                            <Edited className="edited">{`(edited)`}</Edited>
                          </Tooltip>
                        )}
                      </Content>

                      {message.attachment && (
                        <Image
                          src={message.attachment.url}
                          height={+message.attachment.height}
                          width={+message.attachment.width}
                        />
                      )}

                      {/*{message.embeds.map((embed, i) => (
                    <Embed key={i} {...embed} />
                  ))}*/}

                      {message.reactions && (
                        <Reactions className="reactions">
                          {message.reactions.map((reaction, i) => (
                            <Reaction key={i} {...reaction} />
                          ))}
                        </Reactions>
                      )}
                    </Root>
                  </ThemeProvider>
                )
              }

              case 'JoinMessage': {
                const { name } = parseUsername(message.author.name)

                return (
                  <React.Fragment key={message.id}>
                    <JoinText>
                      <FormattedMessage
                        id="message.join_message"
                        values={{
                          name: (
                            <JoinMember id={message.author.id}>
                              {name}
                            </JoinMember>
                          )
                        }}
                      />
                    </JoinText>
                    <Timestamp time={message.timestamp} />
                  </React.Fragment>
                )
              }

              default:
                return null
            }
          })}
        </Messages>
      </Group>
    )
    // }
  }
}

export default Message
