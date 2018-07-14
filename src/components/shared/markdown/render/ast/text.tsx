import * as React from 'react'
import Emoji from 'shared/Emoji'
import SimpleMarkdown from 'simple-markdown'

const text = {
  ...SimpleMarkdown.defaultRules.text,
  parse: ([content], recurseParse, state) =>
    state.nested
      ? { content }
      : recurseParse(content, {
          ...state,
          nested: true
        }),

  react: (node, recurseOutput, state) => (
    <Emoji key={state.key}>{node.content}</Emoji>
  )
}

export default text
