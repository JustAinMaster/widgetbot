import * as React from 'react'
import { connect } from 'fluent'

import { Root } from './elements'
import Hamburger from './Hamburger'

export default connect()
  .with(({ state, signals, props }) => ({
    open: state.visible.channels,
    toggle: () => signals.toggle({ component: 'channels' })
  }))
  .to(({ children, open, toggle }) => (
    <Root>
      <Hamburger onClick={toggle} open={open} />
      {children}
    </Root>
  ))

export { Name, Topic } from './elements'
