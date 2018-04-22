import * as React from 'react'
import { connect } from 'fluent'

import { Root, Icon, Name, Count } from './elements'

export default connect()
  .with(({ state, signals, props }) => ({
    server: state.server
  }))
  .to(({ server }) => {
    const plural = server.memberCount !== 1

    return (
      <Root>
        <Icon src={server.icon} />
        <Name>{server.name}</Name>
        <Count
          title={`${server.memberCount} ${
            plural ? 'members' : 'member'
          } in this server`}
        >
          {server.memberCount}
        </Count>
      </Root>
    )
  })
