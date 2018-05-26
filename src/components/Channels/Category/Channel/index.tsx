import * as React from 'react'

import { Hashtag, Name, Root } from './elements'

interface Props {
  name: string
  unread: boolean
  id: string
  order: number
  selected: boolean
}

class Channel extends React.PureComponent<Props> {
  render() {
    const { name } = this.props

    return (
      <Root {...this.props} className="channel">
        <Hashtag className="hash" />
        <Name className="name">{name}</Name>
      </Root>
    )
  }
}

export default Channel
