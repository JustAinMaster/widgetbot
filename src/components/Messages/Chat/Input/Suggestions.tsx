import * as React from 'react'
import scrollIntoView from 'scroll-into-view-if-needed'

import { Emoji, Name, Suggestion, Suggestions } from './elements'

interface Options {
  value: string
  keyword: string
}
interface Props {
  options: Options[]
  onSelect: Function
}

class EmojiSuggestions extends React.Component<Props> {
  state = {
    selectedIndex: 0
  }
  mouseEvent = false

  traverseSuggestions(increment) {
    this.mouseEvent = false
    const index = this.state.selectedIndex + (increment ? 1 : -1)
    this.setState({
      selectedIndex:
        (index + this.props.options.length) % this.props.options.length
    })
  }

  selectSuggestion() {
    this.props.onSelect(this.props.options[this.state.selectedIndex])
  }

  focus(suggestion: HTMLElement) {
    if (suggestion && !this.mouseEvent) {
      scrollIntoView(suggestion, {
        behavior: 'smooth',
        scrollMode: 'if-needed'
      })
    }
  }

  render() {
    const { options } = this.props
    return (
      <Suggestions length={options.length}>
        {options.map((option, index) => (
          <Suggestion
            key={option.value}
            selected={index === this.state.selectedIndex}
            innerRef={
              index === this.state.selectedIndex ? this.focus.bind(this) : null
            }
            onClick={() => {
              this.props.onSelect(option)
            }}
            onMouseOver={() => {
              this.setState({
                selectedIndex: index
              })
              this.mouseEvent = true
            }}
          >
            <Emoji svg text={option.value} />
            <Name>{option.keyword}</Name>
          </Suggestion>
        ))}
      </Suggestions>
    )
  }
}

export default EmojiSuggestions
