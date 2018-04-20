import * as React from 'react'
import { connect } from 'fluent'
import { Scrollable } from 'styled-elements'

import { Root } from './elements'
import Message from './Message'

export default connect()
  .with(({ state, signals, props }) => ({
    // Observe values
    observe: [state.channels, state.activeChannel, state.loading],
    channel: state.channel
  }))
  .toClass(
    props =>
      class Messages extends React.PureComponent<typeof props> {
        scroll(api) {
          if (api) {
            api.scrollToBottom()
          }
        }

        render() {
          const channel = this.props.channel.get()

          if (channel && channel.messages) {
            return (
              <Root>
                <Scrollable innerRef={this.scroll}>
                  {channel.messages.map(group => (
                    <Message messages={group} key={group[0].id} />
                  ))}
                </Scrollable>
              </Root>
            )
          }

          return <span>LOADING</span>
        }
      }
  )
