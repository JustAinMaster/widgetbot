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
          loading: true,
          fetched: false
        }

        fetch(data: { server: string; channel: string }) {
          const { fetch } = this.props

          if (!this.state.fetched) {
            fetch(data)
            this.setState({
              fetched: true
            })
          }
        }

        render() {
          return (
            <Root>
              <Channels />
              <Messages />
              {/* <Members /> */}
              <Switch>
                <Route
                  path={`/channels/:server/:channel`}
                  component={({ match }) => {
                    this.fetch(match.params)
                    return null
                  }}
                />
                <Route
                  path={`/channels/:server`}
                  render={({ match }) => {
                    this.fetch(match.params)
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
