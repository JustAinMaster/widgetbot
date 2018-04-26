import * as React from 'react'
import Transition from 'react-transition-group/Transition'
import { connect } from 'fluent'

import { Root, Hashtag, Name } from './elements'

interface Props {
  name: string
  id: string
  order: number
  active: boolean
}

class Channel extends React.PureComponent<Props> {
  render() {
    const { name, order, id, active } = this.props

    return (
      <Root selected={active} id={id} order={order}>
        <Hashtag />
        <Name>{name}</Name>
      </Root>
    )
  }
}

export default Channel
