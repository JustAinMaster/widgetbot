import Downshift, { ControllerStateAndHelpers } from 'downshift'
import * as React from 'react'

import { Suggestion, Suggestions, Textarea } from './elements'
import * as emoji from './suggestions/emoji'
import { extractQuery } from './util'

const MAX_SUGGESTIONS = 10

class Input extends React.PureComponent {
  state = {
    open: false,
    suggestions: null,
    handler: null,
    query: null,
    value: ''
  }

  downshift: ControllerStateAndHelpers<any>
  textarea: HTMLTextAreaElement

  inputChanged = (value: string) => {
    try {
      this.updateSuggestions()
      var open = true
    } catch (e) {
      open = false
    }
    this.setState({ open, value })
  }

  /**
   * Listens for keydown events and passes them to downshift
   */
  keyDown = event => {
    const TAB = 9
    const ENTER = 13

    switch (event.keyCode) {
      case ENTER:
        if (this.downshift.isOpen) return

        if (event.shiftKey) {
          console.log('Insert shift')
        } else {
          event.preventDefault()
          console.log('Send message')
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
      case Downshift.stateChangeTypes.blurInput:
        return state
      default:
        return changes
    }
  }

  parseQuery = () => {
    if (!this.textarea) throw false
    const query = extractQuery(this.textarea)

    // Emojis
    if (query.length > 2 && query[0] === ':' && query[1] !== ':') {
      return { handler: emoji, query: query.substring(1) }
    }

    throw null
  }

  updateSuggestions() {
    const { handler, query } = this.parseQuery()
    const suggestions = handler.getSuggestions(query).slice(0, MAX_SUGGESTIONS)

    this.setState({ handler, query, suggestions })
  }

  getSuggestions() {
    const { open, query, handler, suggestions } = this.state
    const { getItemProps, getMenuProps, highlightedIndex } = this.downshift

    if (open && suggestions && suggestions.length) {
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
                selected: highlightedIndex === index,
                children: handler.suggestion(item)
              })}
            />
          ))}
        </Suggestions>
      )
    }

    return null
  }

  render() {
    const { open, value } = this.state

    return (
      <Downshift
        // stateReducer={this.stateReducer}
        itemToString={item => (item ? item.toString() : '')}
        defaultHighlightedIndex={0}
        isOpen={open}
        inputValue={value}
        onInputValueChange={this.inputChanged}
      >
        {downshift => {
          const { getInputProps } = (this.downshift = downshift)
          const suggestions = this.getSuggestions()

          return (
            <div>
              <Textarea
                innerRef={ref => (this.textarea = ref)}
                {...getInputProps({ onKeyDown: this.keyDown })}
              />

              {suggestions}
            </div>
          )
        }}
      </Downshift>
    )
  }
}

export default Input
