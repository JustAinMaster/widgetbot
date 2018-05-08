import * as React from 'react'

import { Category } from '../../../types/category'
import Channel from './Channel'
import { Collapse, Expand, Name, Root, Text } from './elements'

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
        <Name onClick={this.toggle.bind(this)}>
          {this.state.open ? <Collapse /> : <Expand />}
          <Text text={category.name} />
        </Name>

        {category.channels.map(
          ({ name, id }, order) =>
            this.state.open || activeChannel === id ? (
              <Channel
                name={name}
                id={id}
                order={order}
                active={activeChannel === id}
                key={id}
              />
            ) : null
        )}
      </Root>
    )
  }
}
export default ChannelCategory
