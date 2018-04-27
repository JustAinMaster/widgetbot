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
          text={this.state.emoji}
          onClick={() => console.log(1)}
        />
      </Root>
    )
  }

  state = {
    emoji: randomEmoji()
  }

  mouseEnter = () =>
    this.setState({
      emoji: randomEmoji()
    })
}

export default EmojiPanel
