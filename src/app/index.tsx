import * as React from 'react'
import { connect } from 'fluent'

import ChooseChannel from '../components/Overlays/ChooseChannel'
import { Root } from './elements'
import Notifications from './notify'

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
              <Initiate />
              <Notifications />
              <Channels />
              {screen === 'active-channel' && <Messages />}
              {screen === 'choose-channel' && <ChooseChannel />}
            </Root>
          )
        }
      }
  )
