import * as React from 'react'
import { connect } from 'fluent'
import { Scrollable } from 'styled-elements'
import Group from './group'

import { Root } from './elements'
import Message from './Message'
import Loading from '../Loading'
import Header from './Header'

export default connect()
  .with(({ state, signals, props }) => ({
    // Observe values
    observe: [state.channels],

    loading: state.loading,
    activeChannel: state.activeChannel,
    channel: state.channel,
    squashed: state.visible.channels,
    toggle: () => signals.toggle({ component: 'channels' })
  }))
  .toClass(
    props =>
      class Messages extends React.PureComponent<typeof props> {
        content = () => {
          const { loading, toggle, squashed } = this.props
          const channel = this.props.channel.get()

          if (loading) return <Loading />

          if (channel && channel.messages) {
            const messages = Group(channel.messages)

            return (
              <React.Fragment>
                <Header toggle={toggle} open={squashed} channel={channel} />
                <Scrollable innerRef={this.scroll.bind(this)}>
                  {messages.map(group => (
                    <Message messages={group} key={group[0].id} />
                  ))}
                </Scrollable>
              </React.Fragment>
            )
          }

          return <div>Something went wrong</div>
        }

        render() {
          const { squashed } = this.props

          return (
            <Root squashed={squashed} onClick={this.handleClick.bind(this)}>
              <this.content />
            </Root>
          )
        }

        handleClick = () => {
          const { squashed, toggle } = this.props
          if (squashed && window.innerWidth < 520) {
            toggle()
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
