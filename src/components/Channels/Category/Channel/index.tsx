import * as React from 'react'

import { Hashtag, Name, Pings, Root } from './elements'

interface Props {
  unread: boolean
  id: string
  order: number
  selected: boolean
}

const Channel = (props: Props) => (
  <Root {...props} className="channel">
    {({ name }) => (
      <React.Fragment>
        <Hashtag className="hash" />
        <Name innerRef={ref => (this.name = ref)} className="name">
          {name}
        </Name>
        {false && <Pings className="pings">1</Pings>}
      </React.Fragment>
    )}
  </Root>
)

export default Channel
