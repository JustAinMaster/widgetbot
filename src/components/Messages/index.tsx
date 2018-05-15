import { connect } from 'fluent'
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { ScrollVisible } from 'styled-elements/scrollable'

import Header, { Name, Topic } from '../Header'
import { Join, Stretch } from '../Header/elements'
import { Loading, NoMessages } from '../Overlays'
import ErrorAhoy from '../Overlays/ErrorAhoy'
import Wrapper from '../Wrapper'
import Chat from './Chat'
import Group from './group'
import Message from './Message'

export default connect()
  .with(({ state, signals, props }) => {
    const channel = state.channel.get()
    return {
      loading: state.loading,
      activeChannel: state.activeChannel,
      channel,
      messages: channel && channel.messages ? channel.messages.values() : null
    }
  })
  .toClass(
    props =>
      class Messages extends React.PureComponent<typeof props> {
        getContent = () => {
          const { loading } = this.props
          const { messages } = this.props

          if (loading) {
            return <Loading />
          }

          if (messages) {
            const grouped = Group(messages)

            return grouped.length ? (
              <ScrollVisible
                innerRef={this.scroll.bind(this)}
                className="messages"
              >
                {grouped.map(group => (
                  <Message messages={group} key={group[0].id} />
                ))}
              </ScrollVisible>
            ) : (
              <NoMessages className="no-messages" />
            )
          }

          return null
        }

        render() {
          const { channel } = this.props

          const header = channel && (
            <Header>
              <Stretch>
                <Name>{channel.name}</Name>
                {channel.topic && <Topic>{channel.topic}</Topic>}
              </Stretch>
              <Join>
                <FormattedMessage id="header.join" />
              </Join>
            </Header>
          )
          const content = this.getContent()

          return content ? (
            <Wrapper>
              {header}
              {content}
              {channel && channel.permissions.SEND_MESSAGES && <Chat />}
            </Wrapper>
          ) : (
            <ErrorAhoy />
          )
        }

        /**
         * Captures scroll positions from channels, so when
         * you switch channels, your position is retained
         */
        positions = new Map() as Map<string, number>
        position = -1
        scrollable

        componentWillReceiveProps(nextProps: typeof props) {
          const { activeChannel } = this.props
          const nextChannel = nextProps.activeChannel

          if (!activeChannel || !this.scrollable) return

          if (nextChannel !== activeChannel) {
            // Record scroll position of the current channel
            this.positions.set(activeChannel, this.scrollable.getScrollTop())

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
