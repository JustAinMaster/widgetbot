import * as React from 'react'
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
    screen: state.screen
  }))
  .toClass(
    props =>
      class App extends React.PureComponent<typeof props> {
        render() {
          const { screen } = this.props

          return (
            <Root>
              <Initiate addNotification={this.addNotification.bind(this)} />
              <Notifications>
                <Notify ref={ref => (this.notifications = ref)} />
              </Notifications>

              <Channels />
              {screen === 'active-channel' && <Messages />}
              {screen === 'choose-channel' && <ChooseChannel />}
            </Root>
          )
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
      }
  )
