import { ThemeProvider } from 'emotion-theming'
import { parseText } from 'markdown/render'
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
  Root,
  Sys
} from './elements'
import Embed from './Embed'
import { Image } from './Embed/elements/media'
import parseUsername from './parseUsername'
import Reaction from './Reaction'
import { UMessage } from 'queries/messages'

interface Props {
  messages: UMessage[]
  lastSeen: string
}

class Message extends React.PureComponent<Props, any> {
  theme = message => theme => ({
    ...theme,
    message
  })

  render() {
    const { messages, lastSeen } = this.props
    const [firstMessage] = messages

    // if (message.__typename === 'JoinMessage') {
    //   const { name } = parseUsername(message.author.name)

    //   return (
    //     <Group className="message join">
    //       <Messages className="content">
    //         <JoinText>
    //           <FormattedMessage
    //             id="message.join_message"
    //             values={{ name: <JoinMember>{name}</JoinMember> }}
    //           />
    //         </JoinText>
    //         <Timestamp time={message.timestamp} />
    //       </Messages>
    //     </Group>
    //   )
    // }

    // if (message.__typename === 'TextMessage') {
    return (
      <Group className="group">
        {firstMessage.__typename !== 'JoinMessage' ? (
          <Avatar url={firstMessage.author.avatar} className="avatar" />
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
              case 'TextMessage':
                return (
                  <ThemeProvider key={message.id} theme={this.theme(message)}>
                    <Root className="message">
                      <Content className="content">
                        {parseText(message.content)}
                        {/* {message.editedAt && (
                          <Edited className="edited">{`(edited)`}</Edited>
                        )} */}
                      </Content>

                      {/* {message.attachment && (
                    <Image
                      src={message.attachment.url}
                      height={+message.attachment.height}
                      width={+message.attachment.width}
                    />
                  )}

                  {message.embeds.map((embed, i) => (
                    <Embed key={i} {...embed} />
                  ))}

                  {message.reactions && (
                    <Reactions className="reactions">
                      {message.reactions.map((reaction, i) => (
                        <Reaction key={i} {...reaction} />
                      ))}
                    </Reactions>
                  )} */}
                    </Root>
                  </ThemeProvider>
                )

              case 'JoinMessage':
                return (
                  <Root className="message">
                    <JoinText>
                      <FormattedMessage
                        id="message.join_message"
                        values={{ name: <JoinMember>{name}</JoinMember> }}
                      />
                    </JoinText>
                    <Timestamp time={message.timestamp} />
                  </Root>
                )

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
