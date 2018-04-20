import * as React from 'react'
import { connect } from 'fluent'

import { Root, Hashtag, Name } from './elements'

interface Props {
  name: string
  id: string
  active: boolean
}

export default connect<Props>()
  .with(({ state, signals, props }) => ({
    switchChannel: signals.switchChannel
  }))
  .to(props => {
    const { name, id, switchChannel, active } = props
    return (
      <Root
        active={active}
        onClick={() =>
          switchChannel({
            channel: id
          })
        }
      >
        <Hashtag />
        <Name>{name}</Name>
      </Root>
    )
  })
