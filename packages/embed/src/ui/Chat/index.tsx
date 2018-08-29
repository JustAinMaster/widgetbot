import * as React from 'react'

import { Field, Root } from './elements'
import Input from './Input'
import { withI18n, withI18nProps } from '@lingui/react'
import { Query } from 'react-apollo'
import { ChannelName, ThemeVariables, ChannelNameVariables } from '@generated'
import GET_CHANNEL_NAME from './ChannelName.graphql'
import { Route } from 'react-router'

class Chat extends React.PureComponent<withI18nProps> {
  state = {
    rows: 1
  }

  private input: HTMLTextAreaElement

  onChange(value: string) {
    const rows = value.split(/\r\n|\r|\n/).length
    this.setState({ rows })
    this.typing()
  }

  onSubmit(message: string) {
    if (message.length === 0) return
    // TODO: FIX
    // const { sendMessage, activeChannel } = this.props

    // sendMessage({
    //   channel: activeChannel,
    //   message
    // })

    // TODO: Clear the input field only when the user is signed in.
    this.input.value = ''
  }

  isTyping(typing: boolean) {
    // TODO: FIX
    // const { activeChannel, clientTyping } = this.props
    // clientTyping({ channel: activeChannel, typing })
  }

  render() {
    const { i18n } = this.props

    return (
      <Root className="chat">
        <Field rows={this.state.rows} className="field">
          <Route path="/:guild/:channel?">
            {({
              match: {
                params: { channel }
              }
            }) => (
              <Query<ChannelName, ChannelNameVariables>
                query={GET_CHANNEL_NAME}
                variables={{ channel }}
              >
                {a => {
                  console.log(a)
                  return null
                }}
              </Query>
            )}
          </Route>
          {/* <Emoji /> */}
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

    // Clear the previous stopped-typing timer
    clearTimeout(this.monitor.timer)

    // If they don't register a keypress within the threshold
    // then they've stopped typing
    this.monitor.timer = setTimeout(() => {
      this.isTyping(false)
      this.monitor.last = null
    }, threshold)

    // If the threshold time has passed, then send another
    // keypress event to the server
    if (now - monitor.last > threshold) {
      this.isTyping(true)
      monitor.last = now
    }
  }
}

export default withI18n()(Chat)
