import { connect } from 'fluent'
import * as React from 'react'

import { Field, Root } from './elements'
import Emoji from './Emoji'
import Input from './Input'

export default connect()
  .with(({ state, signals, props }) => ({
    channel: state.channel.get(),
    activeChannel: state.activeChannel,
    sendMessage: signals.sendMessage,
    clientTyping: signals.typing
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

        isTyping(typing: boolean) {
          const { activeChannel, clientTyping } = this.props
          clientTyping({ channel: activeChannel, typing })
        }

        render() {
          const { channel } = this.props

          return (
            <Root>
              <Field rows={this.state.rows}>
                <Input
                  onChange={this.onChange.bind(this)}
                  onSubmit={this.onSubmit.bind(this)}
                  onKeyPress={this.typing.bind(this)}
                  placeholder={channel ? `Message #${channel.name}` : null}
                />
                <Emoji />
              </Field>
            </Root>
          )
        }

        monitor = {
          last: null,
          timer: null
        }

        typing() {
          // Typing timeout threshold
          const threshold = 1000

          const now = +new Date()
          const { monitor } = this

          clearTimeout(this.monitor.timer)
          this.monitor.timer = setTimeout(() => {
            this.isTyping(false)
            this.monitor.last = null
          }, threshold)

          if (now - monitor.last > threshold) {
            this.isTyping(true)
            monitor.last = now
          }
        }
      }
  )
