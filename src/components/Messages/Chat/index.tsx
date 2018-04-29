import * as React from 'react'
import { connect } from 'fluent'

import { Root, Field } from './elements'
import Emoji from './Emoji'
import Input from './Input'

export default connect()
  .with(({ state, signals, props }) => ({
    channel: state.channel.get(),
    activeChannel: state.activeChannel,
    sendMessage: signals.sendMessage
  }))
  .toClass(
    props =>
      class Chat extends React.PureComponent<typeof props> {
        state = {
          rows: 1
        }

        onChange(value: string) {
          const rows = value.split(/\r\n|\r|\n/).length
          this.setState({ rows })
        }

        onSubmit(message: string) {
          const { sendMessage, activeChannel } = this.props

          sendMessage({ channel: activeChannel, message })
        }

        render() {
          const { channel } = this.props

          return (
            <Root>
              <Field rows={this.state.rows}>
                <Input
                  onChange={this.onChange.bind(this)}
                  onSubmit={this.onSubmit.bind(this)}
                  placeholder={channel ? `Message #${channel.name}` : null}
                />
                <Emoji />
              </Field>
            </Root>
          )
        }
      }
  )
