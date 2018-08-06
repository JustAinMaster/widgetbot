import { I18nProvider } from '@lingui/react'
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
import i18n, { loadCatalog } from '@lib/i18n'

interface Props {
  language?: string
}

class App extends React.PureComponent<RouteComponentProps<any> & Props> {
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

  async componentDidMount() {
    await loadCatalog('en')
    console.log('loaded')
  }

  render() {
    return (
      <I18nProvider language="en" i18n={i18n}>
        <ThemeProvider>
          <this.app />
        </ThemeProvider>
      </I18nProvider>
    )
  }
}

export default withRouter(App)
