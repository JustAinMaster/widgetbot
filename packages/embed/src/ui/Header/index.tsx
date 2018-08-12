import * as React from 'react'

import { Root } from './elements'
import Hamburger from './Hamburger'

import { SidebarVisibility } from '@generated/SidebarVisibility'
import SIDEBAR_VISIBILITY from '@queries/SidebarVisibility.graphql'
import TOGGLE_SIDEBAR from '@queries/ToggleSidebar.graphql'
import { Query, Mutation } from 'react-apollo'
import { ToggleSidebarVariables, ToggleSidebar } from '@generated/ToggleSidebar'

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
