import { Channel, Mention } from 'shared/markdown/render/elements'
import * as React from 'react'
import SimpleMarkdown from 'simple-markdown'
import controller from '../../../../../controllers/cerebral'

export const mention = {
  order: SimpleMarkdown.defaultRules.text.order,
  match: source => /^<@!?([0-9]+?)>/.exec(source),
  parse: ([mention, id]) => ({ mention, id }),
  react: ({ mention, id }, recurseOutput, state) => {
    const member = controller.state.members.get(id)

    return member ? (
      <Mention key={state.key} color="#fff">
        {`@${member.name}`}
      </Mention>
    ) : (
      <Mention key={state.key}>{mention}</Mention>
    )
  }
}

export const channel = {
  order: SimpleMarkdown.defaultRules.text.order,
  match: source => /^<#?([0-9]+?)>/.exec(source),
  parse: ([mention, id]) => ({ mention, id }),
  react: ({ mention, id }, recurseOutput, state) => {
    return (
      <Channel key={state.key} id={id}>
        {({ name }) => `#${name}`}
      </Channel>
    )
  }
}
