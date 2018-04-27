import * as React from 'react'
import { connect } from 'fluent'

import randomEmoji from './random'
import { Root, Emoji } from './elements'

class EmojiPanel extends React.PureComponent {
  render() {
    return (
      <Root>
        <Emoji
          onMouseEnter={() => this.mouseEnter()}
          onMouseOut={() => this.mouseOut()}
          text={this.state.emoji}
          hover={this.state.hover}
          onClick={() => console.log(1)}
        />
      </Root>
    )
  }

  state = {
    emoji: randomEmoji(),
    hover: false
  }

  mouseEnter = () =>
    this.setState({
      emoji: randomEmoji(),
      hover: true
    })

  mouseOut = () =>
    this.setState({
      hover: false
    })
}

export default EmojiPanel
