import * as React from 'react'
import { messages } from '../../types/message'

import Message from '../Message'
import { Root } from './elements'
import { connect } from 'fluent'

export default connect()
  .with(({ state, signals, props }) => ({
    server: state.server,
    channel: state.channel
  }))
  .toClass(
    props =>
      class Messages extends React.PureComponent<typeof props> {
        render() {
          const channel = this.props.channel.get()

          if (channel) {
            const { messages } = channel

            return (
              <Root>
                {messages.map(group => (
                  <Message messages={group} key={group[0].id} />
                ))}
              </Root>
            )
          }

          return <span>LOADING</span>
        }
      }
  )
