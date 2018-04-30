import * as React from 'react'
import getCaretCoordinates from 'textarea-caret'

import Suggestions from './Suggestions'
import { getEmojiMatches } from './utils/emojis'
import { Root, Input } from './elements'

// Keycodes
const TAB = 9
const ENTER = 13
const ESCAPE = 27
const UP = 38
const DOWN = 40

const SUGGESTIONS_TOP_OFFSET = 20
const DEFAULT_ROWS = 10
const DEFAULT_SUGGESTIONS_LIMIT = 5

export const initialState = {
  leftIndex: -1,
  caretPosition: -1,
  showSuggestions: false,
  query: null
}

interface Props {
  defaultValue?: string
  placeholder?: string
  value?: string
  onChange?: Function
  onSubmit?: Function
  rows?: number
  suggestionsLimit?: number
}

class EmojiInput extends React.Component<Props> {
  state = initialState
  textComponent
  suggestions

  onChange(value) {
    if (this.props.onChange) {
      this.props.onChange(value)
    }
  }

  getValue() {
    return this.textComponent.value
  }

  resetState() {
    this.setState(initialState)
  }

  render() {
    let suggestions = []
    if (this.state.showSuggestions && this.state.query) {
      suggestions = getEmojiMatches(this.state.query)
        .slice(0, this.props.suggestionsLimit || 20)
        .map(emoji => ({
          value: emoji.character,
          keyword: emoji.keyword
        }))
    }

    const valueProps: any = {}
    if (this.props.value) {
      valueProps.value = this.props.value
    }
    if (this.props.defaultValue) {
      valueProps.defaultValue = this.props.defaultValue
    }

    return (
      <Root>
        <Input
          rows={this.props.rows}
          innerRef={textComponent => {
            this.textComponent = textComponent
          }}
          {...valueProps}
          onChange={event => {
            this.onChange(event.target.value)
          }}
          placeholder={this.props.placeholder || null}
          onClick={this.resetState.bind(this)}
          onKeyDown={event => {
            switch (event.keyCode) {
              case UP:
              case DOWN:
                if (this.suggestions) {
                  this.suggestions.traverseSuggestions(event.keyCode === DOWN)
                  event.preventDefault()
                }
                return
              case TAB:
                if (this.suggestions) {
                  this.suggestions.selectSuggestion()
                  event.preventDefault()
                }
                return
              case ENTER:
                if (this.suggestions) {
                  this.suggestions.selectSuggestion()
                  event.preventDefault()
                  return
                }

                if (!event.shiftKey) {
                  // Submit
                  if (this.props.onSubmit) {
                    this.props.onSubmit(this.textComponent.value)
                    // Clear input field
                    this.textComponent.value = ''
                    if (this.props.onChange) this.props.onChange('')
                  }
                  event.preventDefault()
                }

                return
              case ESCAPE:
                this.resetState()
                break
              default:
                break
            }
          }}
          onInput={() => {
            const textComponent = this.textComponent
            const caretPosition = textComponent.selectionStart
            let leftIndex = caretPosition
            const value = textComponent.value
            while (leftIndex > 0) {
              leftIndex -= 1
              if (/\s/.test(value[leftIndex])) {
                leftIndex += 1
                break
              }
            }
            const query = value.substring(leftIndex, caretPosition)
            const newState: any = {
              leftIndex,
              caretPosition,
              showSuggestions: false
            }
            if (query.length > 1 && query[0] === ':' && query[1] !== ':') {
              newState.showSuggestions = true
              newState.query = query.substring(1)
            }
            if (!this.state.showSuggestions && newState.showSuggestions) {
              const { top, left } = getCaretCoordinates(
                textComponent,
                textComponent.selectionEnd
              )
            }
            this.setState(newState)
          }}
        />
        {this.state.showSuggestions &&
          suggestions.length > 0 && (
            <Suggestions
              ref={sug => {
                this.suggestions = sug
              }}
              options={suggestions}
              onSelect={option => {
                const text = this.textComponent.value
                let value = option.keyword
                const beforeQuery = text.substring(0, this.state.leftIndex)
                const afterQuery = text.substring(
                  this.state.caretPosition,
                  text.length
                )
                const newText = `${beforeQuery}${value} ${afterQuery}`
                this.textComponent.value = newText
                this.onChange(newText)
                this.textComponent.focus()
                const newCaretPosition = this.state.leftIndex + value.length + 1
                this.textComponent.setSelectionRange(
                  newCaretPosition,
                  newCaretPosition
                )
                this.resetState()
              }}
            />
          )}
      </Root>
    )
  }
}

export default EmojiInput
