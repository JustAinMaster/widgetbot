import * as React from 'react'
import Transition from 'react-transition-group/Transition'
import { connect } from 'fluent'

import { Root, Hashtag, Name } from './elements'

interface Props {
  name: string
  id: string
  i: number
  active: boolean
}

export default connect<Props>()
  .with(({ state, signals, props }) => ({
    switchChannel: signals.switchChannel
  }))
  .toClass(
    props =>
      class Channel extends React.PureComponent<typeof props> {
        render() {
          const { name, i, id, switchChannel, active } = this.props

          return (
            <Root
              selected={active}
              id={id}
              i={i}
              onClick={() => {
                switchChannel({
                  channel: id
                })
              }}
            >
              <Hashtag />
              <Name>{name}</Name>
            </Root>
          )
        }
      }
  )
