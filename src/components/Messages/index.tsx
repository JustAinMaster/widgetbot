import * as React from 'react'
import { connect } from 'fluent'
import { Scrollable } from 'styled-elements'
import Group from './group'

import { Root } from './elements'
import ErrorAhoy from '../Overlays/ErrorAhoy'
import { Loading } from '../Overlays'

import Wrapper from '../Wrapper'
import Header, { Name, Topic } from '../Header'
import Message from './Message'
import Chat from './Chat'

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

            return (
              <Scrollable innerRef={this.scroll.bind(this)}>
                {grouped.map(group => (
                  <Message messages={group} key={group[0].id} />
                ))}
              </Scrollable>
            )
          }

          return null
        }

        render() {
          const { channel } = this.props

          const header = channel && (
            <Header>
              <Name>{channel.name}</Name>
              {channel.topic && <Topic>{channel.topic}</Topic>}
            </Header>
          )
          const content = this.getContent()

          return content ? (
            <Wrapper>
              {header}
              {content}
              <Chat />
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
