import * as React from 'react'

import { Root } from './elements'
import Hamburger from './Hamburger'

import { SidebarVisibility } from '@queries/__generated__/SidebarVisibility'
import { SIDEBAR_VISIBILITY, TOGGLE_SIDEBAR } from '@queries/sidebar'
import { Query, Mutation } from 'react-apollo'
import {
  ToggleSidebarVariables,
  ToggleSidebar
} from '@queries/__generated__/ToggleSidebar'

const Header = ({ children }) => (
  <Query<SidebarVisibility> query={SIDEBAR_VISIBILITY}>
    {({ data }) => (
      <Root className="header">
        <Mutation<ToggleSidebar, ToggleSidebarVariables>
          mutation={TOGGLE_SIDEBAR}
        >
          {toggle => <Hamburger onClick={toggle} open={data.sidebar.open} />}
        </Mutation>
        {children}
      </Root>
    )}
  </Query>
)

export default Header

export { Name, Topic } from './elements'
