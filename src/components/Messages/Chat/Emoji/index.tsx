import * as React from 'react'

import { Emoji, Root } from './elements'
import randomEmoji from './random'

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
