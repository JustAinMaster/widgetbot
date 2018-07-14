import * as React from 'react'
import { Channel, Mention } from 'shared/markdown/render/elements'
import SimpleMarkdown from 'simple-markdown'

export const mention = {
  order: SimpleMarkdown.defaultRules.text.order,
  match: source => /^<@!?([0-9]+?)>/.exec(source),
  parse: ([mention, id]) => ({ mention, id }),
  react: ({ mention, id }, recurseOutput, state) => (
    <Mention key={state.key} id={id}>
      {({ name }) => name}
    </Mention>
  )
}

export const channel = {
  order: SimpleMarkdown.defaultRules.text.order,
  match: source => /^<#?([0-9]+?)>/.exec(source),
  parse: ([mention, id]) => ({ mention, id }),
  react: ({ mention, id }, recurseOutput, state) => (
    <Channel key={state.key} id={id}>
      {({ name }) => `#${name}`}
    </Channel>
  )
}
