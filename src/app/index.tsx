import { connect } from 'fluent'
import * as React from 'react'
import { IntlProvider } from 'react-intl'
import initiate from 'socket-io'

import Channels from '../components/Channels'
import Messages from '../components/Messages'
import Modal from '../components/Modal'
import ChooseChannel from '../components/Overlays/ChooseChannel'
import { Root } from './elements'
import Notifications from './notify'

// SocketIO
export default connect()
  .with(({ state, signals, props }) => ({
    screen: state.screen,
    locale: state.url.lang,
    translation: state.translation
  }))
  .toClass(
    props =>
      class App extends React.PureComponent<typeof props> {
        componentDidMount() {
          initiate()
        }

        render() {
          const { screen, locale, translation } = this.props

          return (
            <IntlProvider
              locale={locale}
              messages={translation}
              textComponent={React.Fragment}
            >
              <Root>
                <Modal />
                <Notifications />
                <Channels />
                {screen === 'active-channel' && <Messages />}
                {screen === 'choose-channel' && <ChooseChannel />}
              </Root>
            </IntlProvider>
          )
        }
      }
  )
