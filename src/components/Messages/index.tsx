import { connect } from 'fluent'
import { addNotification } from 'notify'
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { fetchInvite } from 'socket-io'
import { ScrollVisible } from 'styled-elements/scrollable'

import Header, { Name, Topic } from '../Header'
import { Join, Stretch } from '../Header/elements'
import { Loading, NoMessages } from '../Overlays'
import ErrorAhoy from '../Overlays/ErrorAhoy'
import Wrapper from '../Wrapper'
import Chat from './Chat'
import Group from './group'
import Message from './Message'

import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import MESSAGES, { VMessages, Messages } from 'queries/messages'
import CHANNEL, { Channel, VChannel } from 'queries/channel'

const defaultInvite = 'https://discord.gg/mpMQCuj'

class ChannelQuery extends Query<Channel, VChannel> {}
class MessagesQuery extends Query<Messages, VMessages> {}

export default connect()
  .with(({ state, signals, props }) => ({
    server: state.server,
    channel: state.activeChannel
  }))
  .toClass(
    props =>
      class extends React.PureComponent<typeof props> {
        header = () => {
          const { server, channel } = this.props
          return (
            <ChannelQuery query={CHANNEL} variables={{ server, channel }}>
              {({ loading, error, data }) => {
                const name = loading || error ? '' : data.server.channel.name
                const topic =
                  loading || error ? null : data.server.channel.topic

                return (
                  <Header>
                    <Stretch>
                      <Name>{name}</Name>
                      {topic && <Topic>{topic}</Topic>}
                    </Stretch>
                    <Join
                      href={defaultInvite}
                      target="_blank"
                      onClick={this.join.bind(this)}
                    >
                      <FormattedMessage id="header.join" />
                    </Join>
                  </Header>
                )
              }}
            </ChannelQuery>
          )
        }

        render() {
          const { server, channel } = this.props
          return (
            <MessagesQuery
              query={MESSAGES}
              variables={{ server, channel }}
              fetchPolicy="cache-and-network"
              // pollInterval={1000}
            >
              {({ loading, error, data }) => {
                if (error) {
                  return <ErrorAhoy message={error.message} />
                }

                let content = <Loading />

                if (!loading || (data && data.server)) {
                  const grouped = Group(data.server.channel.messages)

                  content = grouped.length ? (
                    <ScrollVisible
                      innerRef={this.scroll.bind(this)}
                      className="messages"
                    >
                      {grouped.map(group => (
                        <Message
                          messages={group}
                          key={group[0].id}
                          // TODO: Fix
                          lastSeen={null}
                        />
                      ))}
                    </ScrollVisible>
                  ) : (
                    <NoMessages className="no-messages" />
                  )
                }

                return (
                  <Wrapper>
                    <this.header />
                    {content}
                  </Wrapper>
                )
              }}
            </MessagesQuery>
          )

          // return content ? (
          //   <Wrapper>
          //     {/*header*/}
          //     {content}
          //     {/*channel && channel.permissions.SEND_MESSAGES && <Chat />*/}
          //   </Wrapper>
          // ) : (
          //   <ErrorAhoy />
          // )
        }

        async join(event: Event) {
          const { channel } = this.props
          const { window, document } = self.open()

          event.preventDefault()

          document.body.style.backgroundColor = '#36393F'
          document.title = `Join Discord server`

          // Attempt to get an invite for the specified channel
          // if it fails, fallback to one on a random channel
          try {
            const invite = await fetchInvite(channel)
            document.location.href = invite
          } catch (e) {
            window.close()
            addNotification({
              level: 'error',
              title: 'Unable to Join',
              message:
                'WidgetBot does not have permissions to invite you to this server...',
              autoDismiss: 5000
            })
          }
        }

        /**
         * Captures scroll positions from channels, so when
         * you switch channels, your position is retained
         */
        positions = new Map() as Map<string, number>
        position = -1
        scrollable

        componentWillReceiveProps(nextProps: typeof props) {
          const { channel } = this.props
          const nextChannel = nextProps.channel

          if (!channel || !this.scrollable) return

          if (nextChannel !== channel) {
            // Record scroll position of the current channel
            this.positions.set(channel, this.scrollable.getScrollTop())

            // Extract the last scroll position of the next channel
            if (this.positions.has(nextChannel)) {
              this.position = this.positions.get(nextChannel)
            } else {
              this.position = -1
            }
          }
        }

        scroll(ref) {
          if (!ref) return
          this.scrollable = ref

          if (this.scrollable) {
            if (this.position === -1) {
              this.scrollable.scrollToBottom()
            } else {
              this.scrollable.scrollTop(this.position)
            }
          }
        }
      }
  )
