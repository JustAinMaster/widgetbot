import { EMOJI_TO_NAME } from 'markdown/render/ast/emotes'
import SimpleMarkdown from 'simple-markdown'

function convertSurrogateToName(surrogate: string, colons = true) {
  // what is a for?
  let a = ''

  if (EMOJI_TO_NAME.hasOwnProperty(surrogate)) {
    a = EMOJI_TO_NAME[surrogate]
  }

  return colons ? `:${a}:` : a
}

const replacer = (() => {
  const surrogates = Object.keys(EMOJI_TO_NAME)
    .sort(surrogate => -surrogate.length)
    .map(surrogate => escape(surrogate))
    .join('|')

  return new RegExp('(' + surrogates + ')', 'g')
})()

function translateSurrogatesToInlineEmoji(surrogates) {
  return surrogates.replace(replacer, (_, match) =>
    convertSurrogateToName(match)
  )
}

const text = {
  ...SimpleMarkdown.defaultRules.text,
  parse: ([content], recurseParse, state) =>
    state.nested
      ? { content }
      : recurseParse(translateSurrogatesToInlineEmoji(content), {
          ...state,
          nested: true
        })
}

export default text
