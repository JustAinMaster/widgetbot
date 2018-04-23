import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'fluent'
import * as Notify from 'react-notification-system'

import ChooseChannel from '../components/Overlays/ChooseChannel'
import { Root, Notifications } from './elements'
import Channels from '../components/Channels'
import Messages from '../components/Messages'
import Members from '../components/Members'

// SocketIO
import Initiate from '../controllers/socket-io'

export default connect()
  .with(({ state, signals, props }) => ({
    fetch: signals.fetchServer
  }))
  .toClass(
    props =>
      class App extends React.PureComponent<typeof props> {
        render() {
          return (
            <Root>
              <Initiate addNotification={this.addNotification.bind(this)} />
              <Notifications>
                <Notify ref={ref => (this.notifications = ref)} />
              </Notifications>

              <Channels />
              <Switch>
                <Route
                  path={`/channels/:server/:channel`}
                  component={({ match }) => {
                    this.fetch(match.params)
                    return <Messages />
                  }}
                />
                <Route
                  path={`/channels/:server`}
                  render={({ match }) => {
                    this.fetch(match.params)
                    return <ChooseChannel />
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

        state = {
          loading: true,
          fetched: false
        }
        notifications: Notify.System

        addNotification(notification) {
          if (this.notifications) {
            this.notifications.addNotification({
              position: 'br',
              ...notification
            })
          }
        }

        fetch(data: { server: string; channel: string }) {
          const { fetch } = this.props

          if (!this.state.fetched) {
            fetch(data)
            this.setState({ fetched: true })
          }
        }

        update = () => {
          this.setState({ fetched: false })
          this.forceUpdate()
        }

        componentDidMount() {
          window.addEventListener('popstate', this.update)
        }

        componentWillUnmount() {
          window.removeEventListener('popstate', this.update)
        }
      }
  )
