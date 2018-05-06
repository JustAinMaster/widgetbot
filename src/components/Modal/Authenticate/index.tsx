import { connect } from 'fluent'
import * as React from 'react'

import {
  Button,
  Discord,
  Greeting,
  Group,
  Input,
  Root,
  SSO,
  Title,
} from './elements'

export default connect()
  .with(({ state, signals, props }) => ({
    toggle: signals.modal,
    createAccount: signals.createAccount,
    singleSignOn: signals.singleSignOn
  }))
  .toClass(
    props =>
      class Authenticate extends React.PureComponent<typeof props> {
        state = {
          awaiting: false
        }
        nameField: HTMLInputElement

        createAccount(event: Event) {
          event.preventDefault()

          const name = this.nameField.value

          const { toggle, createAccount } = this.props
          toggle({ open: false })

          createAccount({ name })
        }

        singleSignOn(event: Event) {
          event.preventDefault()

          const { singleSignOn } = this.props
          singleSignOn()

          this.setState({
            awaiting: true
          })
        }

        render() {
          const { awaiting } = this.state
          return (
            <Root loading={awaiting}>
              <Title>Welcome!</Title>
              <Greeting>Pick a name to start chatting</Greeting>
              <Group label="name">
                <Input
                  innerRef={ref => (this.nameField = ref)}
                  autoFocus={true}
                  spellCheck={false}
                />
                <Button onClick={this.createAccount.bind(this)}>Create</Button>
                <SSO>
                  Discord account?
                  <Discord onClick={this.singleSignOn.bind(this)}>
                    Log in
                  </Discord>
                </SSO>
              </Group>
            </Root>
          )
        }
      }
  )
