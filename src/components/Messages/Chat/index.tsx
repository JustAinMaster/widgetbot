import * as React from 'react'
import { connect } from 'fluent'

import { Root, Field } from './elements'
import Emoji from './Emoji'
import Input from './Input'

export default connect()
  .with(({ state, signals, props }) => ({
    channel: state.channel
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

        onSubmit(message: String) {
          console.log(message)
        }

        render() {
          const channel = this.props.channel.get()

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
