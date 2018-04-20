import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'fluent'

import { Wrapper } from './elements'
import Messages from './components/Messages'

export default connect()
  .with(({ state, signals, props }) => ({
    fetch: signals.fetchMessages
  }))
  .toClass(
    props =>
      class App extends React.PureComponent<typeof props> {
        state = {
          loading: true
        }

        scroll(api) {
          if (api) {
            api.scrollToBottom()
          }
        }

        render() {
          const { fetch } = this.props
          return (
            <React.Fragment>
              <Wrapper innerRef={this.scroll}>
                <Messages />
              </Wrapper>
              <Switch>
                <Route
                  path={`/channels/:server/:channel`}
                  component={({ match }) => {
                    fetch(match.params)
                    return <span>good</span>
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
            </React.Fragment>
          )
        }
      }
  )
