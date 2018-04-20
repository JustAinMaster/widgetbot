import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'fluent'

import { Root } from './elements'
import Channels from '../components/Channels'
import Messages from '../components/Messages'
import Members from '../components/Members'

export default connect()
  .with(({ state, signals, props }) => ({
    fetch: signals.fetchServer
  }))
  .toClass(
    props =>
      class App extends React.PureComponent<typeof props> {
        state = {
          loading: true
        }

        render() {
          const { fetch } = this.props
          return (
            <Root>
              <Channels />
              <Messages />
              {/* <Members /> */}
              <Switch>
                <Route
                  path={`/channels/:server/:channel`}
                  component={({ match }) => {
                    fetch(match.params)
                    return null
                  }}
                />
                <Route
                  path={`/channels/:server`}
                  render={({ match }) => {
                    fetch(match.params)
                    return <h3>Please select a topic.</h3>
                  }}
                />
                <Route
                  path={`/channels`}
                  render={() => {
                    // Invalid URL, redirect to homepage
                    location.href = '/'
                    return null
                  }}
                />
              </Switch>
            </Root>
          )
        }
      }
  )
