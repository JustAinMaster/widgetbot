import { Emoji } from 'markdown/render/elements'
import * as React from 'react'
import SimpleMarkdown from 'simple-markdown'
import { iterate } from 'styled-elements/Emoji/emojiMap'

export const DIVERSITY_SURROGATES = ['🏻', '🏼', '🏽', '🏾', '🏿']
export const NAME_TO_EMOJI = {}
export const EMOJI_TO_NAME = {}

iterate(({ keywords, emoji }) => {
  EMOJI_TO_NAME[emoji] = keywords[0] || ''
  keywords.forEach(keyword => {
    NAME_TO_EMOJI[keyword] = emoji

    DIVERSITY_SURROGATES.forEach((d, i) => {
      NAME_TO_EMOJI[`${name}::skin-tone-${i + 1}`] = emoji.concat(d)
    })
  })
  DIVERSITY_SURROGATES.forEach((d, i) => {
    const surrogates = emoji.concat(d)
    const name = keywords[0] || ''

    EMOJI_TO_NAME[surrogates] = `${name}::skin-tone-${i + 1}`
  })
})

function convertNameToSurrogate(name: string) {
  // what is t for?
  return NAME_TO_EMOJI.hasOwnProperty(name) ? NAME_TO_EMOJI[name] : ''
}

const getEmoteURL = emote => `https://cdn.discordapp.com/emojis/${emote.id}.png`
const getAnimEmoteURL = emote =>
  `https://cdn.discordapp.com/emojis/${emote.id}.gif`

function getEmojiURL(surrogate) {
  if (['™', '©', '®'].indexOf(surrogate) > -1) {
    return ''
  }

  try {
    // we could link to discord's cdn, but there's a lot of these
    // and i'd like to minimize the amount of data we need directly from them
    return `https://twemoji.maxcdn.com/2/svg/aaa.svg`
  } catch (error) {
    return ''
  }
}

export const emoji = {
  order: SimpleMarkdown.defaultRules.text.order,
  match: source => /^:([^\s:]+?(?:::skin-tone-\d)?):/.exec(source),
  parse([content, name]) {
    const surrogate = convertNameToSurrogate(name)
    return surrogate
      ? {
          name: `:${name}:`,
          surrogate,
          src: getEmojiURL(surrogate)
        }
      : { type: 'text', content }
  },
  react: (node, recurseOutput, state) =>
    node.src ? (
      <Emoji
        key={state.key}
        draggable={false}
        enlarged={node.jumboable}
        alt={node.surrogate}
        src={node.src}
      />
    ) : (
      <span key={state.key}>{node.surrogate}</span>
    )
}

export const customEmoji = {
  order: SimpleMarkdown.defaultRules.text.order,
  match: source => /^<:(\w+):(\d+)>/.exec(source),
  parse: ([, name, id]) => ({
    emojiId: id,
    // NOTE: we never actually try to fetch the emote
    // so checking if colons are required (for 'name') is not
    // something we can do to begin with
    name,
    src: getEmoteURL({ id })
  }),
  react: node => (
    <Emoji
      draggable={false}
      enlarged={node.jumboable}
      alt={`<:${node.name}:${node.emojiId}>`}
      src={node.src}
    />
  )
}

export const animatedEmoji = {
  order: SimpleMarkdown.defaultRules.text.order,
  match: source => /^<a:(\w+):(\d+)>/.exec(source),
  parse: ([, name, id]) => ({
    emojiId: id,
    // NOTE: we never actually try to fetch the emote
    // so checking if colons are required (for 'name') is not
    // something we can do to begin with
    name,
    src: getAnimEmoteURL({ id: id })
  }),
  react: node => (
    <Emoji
      draggable={false}
      enlarged={node.jumboable}
      alt={`<:${node.name}:${node.emojiId}>`}
      src={node.src}
    />
  )
}
