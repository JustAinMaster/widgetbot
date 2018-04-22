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
        getURL = () => {
          const { id } = this.props
          const path = location.pathname.split('/')


          if (path.length > 4) {
            return id
          }

          return `/channels/${path[2]}/${id}`
        }

        render() {
          const { name, i, id, switchChannel, active } = this.props

          return (
            <Root
              selected={active}
              to={this.getURL()}
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
