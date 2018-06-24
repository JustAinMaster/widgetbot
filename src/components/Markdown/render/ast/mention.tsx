import { Channel, Mention } from 'markdown/render/elements'
import * as React from 'react'
import SimpleMarkdown from 'simple-markdown'

import controller from '../../../../controllers/cerebral'

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
    const channel = controller.state.channels.get(id)

    return channel ? (
      <Channel key={state.key} id={id}>
        {`#${channel.name}`}
      </Channel>
    ) : (
      <Channel key={state.key}>{`#deleted-channel`}</Channel>
    )
  }
}
