import * as React from 'react'

import Channel from './Channel'
import { Collapse, Emoji, Expand, Name, Root, Text } from './elements'
import { Category } from '../categorise'

interface Props {
  category: Category
  activeChannel: string
}

class ChannelCategory extends React.PureComponent<Props> {
  state = {
    open: true
  }

  toggle() {
    this.setState({ open: !this.state.open })
  }

  render() {
    const { category, activeChannel } = this.props

    return (
      <Root className="category">
        {category.name && (
          <Name onClick={this.toggle.bind(this)}>
            {this.state.open ? <Collapse /> : <Expand />}
            <Text>
              <Emoji>{category.name}</Emoji>
            </Text>
          </Name>
        )}

        {category.channels.map(({ name, id /*unread*/ }, order) => {
          // TODO: Implement unread
          let unread = false
          const selected = activeChannel === id

          return this.state.open || selected || unread ? (
            <Channel
              key={id}
              {...{
                id,
                order,
                unread,
                selected
              }}
            />
          ) : null
        })}
      </Root>
    )
  }
}
export default ChannelCategory
