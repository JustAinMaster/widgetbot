import Downshift, { ControllerStateAndHelpers } from 'downshift'
import * as React from 'react'

import { Suggestion, Suggestions, Textarea } from './elements'
import * as emoji from './suggestions/emoji'
import { extractQuery } from './util'

const MAX_SUGGESTIONS = 10

class Input extends React.PureComponent {
  downshift: ControllerStateAndHelpers<any>
  textarea: HTMLTextAreaElement

  /**
   * Listens for keydown events and passes them to downshift
   */
  keyDown = event => {
    const TAB = 9
    const ENTER = 13

    switch (event.keyCode) {
      case ENTER:
        if (!event.shiftKey) {
          console.log(this.downshift.inputValue)
          event.preventDefault()
        }
        return
      case TAB:
        event.preventDefault()
        this.downshift.selectHighlightedItem()
        return
      default:
        break
    }
  }

  stateReducer = (state, changes) => {
    console.log(state, changes)

    switch (changes.type) {
      // Disable enter key
      case Downshift.stateChangeTypes.keyDownEnter:
        return state
      default:
        return changes
    }
  }

  parseQuery = () => {
    if (!this.textarea) return null
    const query = extractQuery(this.textarea)

    // Emojis
    if (query.length > 2 && query[0] === ':' && query[1] !== ':') {
      return { handler: emoji, query: query.substring(1) }
    }

    return null
  }

  suggestions() {
    const {
      isOpen,
      getItemProps,
      getMenuProps,
      highlightedIndex
    } = this.downshift

    const suggestion = this.parseQuery()
    if (!suggestion) return null

    const { handler, query } = suggestion
    const suggestions = handler.getSuggestions(query).slice(0, MAX_SUGGESTIONS)

    if (isOpen && suggestions && suggestions.length) {
      return (
        <Suggestions length={suggestions.length} {...getMenuProps()}>
          {handler.description(query)}

          {suggestions.map((item, index) => (
            <Suggestion
              {...getItemProps({
                key: handler.toString(item),
                index,
                item: {
                  ...item,
                  toString: () => handler.toString(item)
                },
                selected: highlightedIndex === index
              })}
            >
              {handler.suggestion(item)}
            </Suggestion>
          ))}
        </Suggestions>
      )
    }

    return null
  }

  render() {
    return (
      <Downshift
        stateReducer={this.stateReducer}
        // itemToString={item => (item ? item.toString() : '')}
        defaultHighlightedIndex={0}
      >
        {downshift => {
          const { getInputProps } = (this.downshift = downshift)

          return (
            <div>
              <Textarea
                innerRef={ref => (this.textarea = ref)}
                {...getInputProps({ onKeyDown: this.keyDown })}
              />

              {this.suggestions()}
            </div>
          )
        }}
      </Downshift>
    )
  }
}

export default Input
