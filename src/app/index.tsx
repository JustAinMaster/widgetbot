import { connect } from 'fluent'
import Notifications from 'notify'
import * as React from 'react'
import { IntlProvider } from 'react-intl'

import Channels from '../components/Channels'
import Modal from '../components/Modal'
import ChooseChannel from '../components/Overlays/ChooseChannel'
import MessagesView from '../components/Messages'
import {
  Switch,
  Route,
  Redirect,
  withRouter,
  RouteComponentProps
} from 'react-router'
import ThemeProvider from './ThemeProvider'

class App extends React.PureComponent<RouteComponentProps<any>> {
  app = () => (
    <Switch>
      <Route path="/:server">
        <>
          <Modal />
          <Notifications />
          <Channels />
          <Switch>
            <Route path="/:server/:channel" component={MessagesView} />
            <Route component={ChooseChannel} />
          </Switch>
        </>
      </Route>

      <Redirect to="/299881420891881473" />
    </Switch>
  )

  render() {
    // const { locale, translation } = this.props
    // TODO: Fix locale + translation
    return (
      <ThemeProvider>
        <IntlProvider
          locale={'en'}
          messages={{}}
          textComponent={React.Fragment}
        >
          <this.app />
        </IntlProvider>
      </ThemeProvider>
    )
  }
}

export default withRouter(App)
