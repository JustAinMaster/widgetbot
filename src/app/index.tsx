import Modal from '@ui/Modal'
import Sidebar from '@ui/Sidebar'
import ChooseChannel from '@views/ChooseChannel'
import MessagesView from '@views/Messages'
import Notifications from 'notify'
import * as React from 'react'
import {
  Redirect,
  Route,
  RouteComponentProps,
  Switch,
  withRouter
} from 'react-router'

import ThemeProvider from './ThemeProvider'

class App extends React.PureComponent<RouteComponentProps<any>> {
  app = () => (
    <Switch>
      <Route path="/:server">
        <React.Fragment>
          <Modal />
          <Notifications />
          <Sidebar />
          <Switch>
            <Route path="/:server/:channel" component={MessagesView} />
            <Route component={ChooseChannel} />
          </Switch>
        </React.Fragment>
      </Route>

      <Redirect to="/299881420891881473" />
    </Switch>
  )

  render() {
    // const { locale, translation } = this.props
    // TODO: Fix locale + translation
    return (
      <ThemeProvider>
        <this.app />
      </ThemeProvider>
    )
  }
}

export default withRouter(App)
