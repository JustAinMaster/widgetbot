import * as hljs from 'highlight.js'
import * as React from 'react'
import SimpleMarkdown from 'simple-markdown'
import { iterate } from 'styled-elements/Emoji/emojiMap'

import controller from '../../../controllers/cerebral'
import { Channel, Code, Emoji, Link, Twemoji } from './elements'

export function parseText(msg: string) {
  function mentions(array: [string | string[]]) {
    return array.map(e => {
      if (typeof e !== 'string') {
        return e
      }

      // mentions.members.forEach((member, i) => {
      //   const roles = member.roles.sort(
      //     (a, b) => (a.position < b.position ? 1 : -1)
      //   )
      //   let color
      //   for (let role of roles) {
      //     if (role.color !== '#000000') {
      //       color = role.color
      //       break
      //     }
      //   }

      //   e = replace(
      //     e,
      //     new RegExp(`<@!*${member.id}>`, 'g'),
      //     <Mention
      //       key={member.id}
      //       color={color}
      //       // onClick={() => props.setUserPopup(member)}
      //     >
      //       {`@${member.name}`}
      //     </Mention>
      //   )
      // })

      const channels = controller.state.channels.entries()

      channels.forEach(([id, { name }], i) => {
        e = replace(
          e,
          `<#${id}>`,
          <Channel key={i} id={id}>
            {`#${name}`}
          </Channel>
        )
      })

      // mentions.roles.forEach((role, i) => {
      //   e = replace(
      //     e,
      //     `<@&${role.id}>`,
      //     <Role role={role} key={role.id} color={role.color}>{`@${
      //       role.name
      //     }`}</Role>
      //   )
      // })

      // let _e: string[] | string = e as string[] | string
      // if (_e instanceof Array) {
      //   _e.map(a => {
      //     return typeof a === 'string'
      //       ? a.replace(/<@&[0-9]{18}>/g, '@deleted-role')
      //       : a
      //   })
      // } else {
      //   e = e.replace(/<@&[0-9]{18}>/g, '@deleted-role')
      // }

      // if (mentions.everyone) {
      //   e = replace(
      //     e,
      //     '@everyone',
      //     <Role key={Math.random()} everyone>
      //       {`@everyone`}
      //     </Role>
      //   )
      //   e = replace(
      //     e,
      //     '@here',
      //     <Role key={Math.random()} everyone>
      //       {`@here`}
      //     </Role>
      //   )
      // }

      return e
    })
  }

  function replace(string, regex, element) {
    if (string instanceof Array) {
      return string.map(e => replace(e, regex, element))
    } else if (typeof string === 'string') {
      const parts = string.split(regex)

      for (var i = 1; i < parts.length; i += 2) {
        parts.splice(i, 0, element)
      }

      return parts
    }
    return string
  }

  const emoji = input =>
    input.map(
      (part, i) =>
        typeof part === 'string' ? (
          <Twemoji
            resolveNames
            onlyEmojiClassName="enlarged"
            text={part}
            key={i * Math.random()}
          />
        ) : (
          part
        )
    )

  return emoji(mentions(parse(msg)))
}
// this is mostly translated from discord's client,
// although it's not 1:1 since the client js is minified
// and also is transformed into some tricky code

// names are weird and sometimes missing, as i'm not sure
// what all of these are doing exactly.

const emojiTipOptions = {
  'data-type': 'dark',
  'data-effect': 'solid',
  'data-delay-show': 450,
  'data-place': 'top',
  'data-offset': "{ 'top': 3 }"
}

function flattenAst(node, parent?) {
  if (Array.isArray(node)) {
    for (let n = 0; n < node.length; n++) {
      node[n] = flattenAst(node[n], parent)
    }

    return node
  }

  if (node.content != null) {
    node.content = flattenAst(node.content, node)
  }

  if (parent != null && node.type === parent.type) {
    return node.content
  }

  return node
}

function astToString(node) {
  function inner(node, result = []) {
    if (Array.isArray(node)) {
      node.forEach(subNode => astToString(subNode))
    } else if (typeof node.content === 'string') {
      result.push(node.content)
    } else if (node.content != null) {
      astToString(node.content)
    }

    return result
  }

  return inner(node).join('')
}

function recurse(node, recurseOutput, state) {
  if (typeof node.content === 'string') {
    return node.content
  }

  return recurseOutput(node.content, state)
}

function parserFor(rules, returnAst?) {
  const parser = SimpleMarkdown.parserFor(rules)
  const renderer = SimpleMarkdown.reactFor(
    SimpleMarkdown.ruleOutput(rules, 'react')
  )
  return function(input = '', inline = true, state = {}, transform = null) {
    if (!inline) {
      input += '\n\n'
    }

    let ast = parser(input, { inline, ...state })
    ast = flattenAst(ast)
    if (transform) {
      ast = transform(ast)
    }

    if (returnAst) {
      return ast
    }

    return renderer(ast)
  }
}

function omit(object, excluded) {
  return Object.keys(object).reduce((result, key) => {
    if (excluded.indexOf(key) === -1) {
      result[key] = object[key]
    }

    return result
  }, {})
}

// emoji stuff

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

// emoji lookup tables

const DIVERSITY_SURROGATES = ['🏻', '🏼', '🏽', '🏾', '🏿']
const NAME_TO_EMOJI = {}
const EMOJI_TO_NAME = {}

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

const EMOJI_NAME_AND_DIVERSITY_RE = /^:([^\s:]+?(?:::skin-tone-\d)?):/

function convertNameToSurrogate(name) {
  // what is t for?
  return NAME_TO_EMOJI.hasOwnProperty(name) ? NAME_TO_EMOJI[name] : ''
}

function convertSurrogateToName(surrogate, colons = true) {
  // what is a for?
  let a = ''

  if (EMOJI_TO_NAME.hasOwnProperty(surrogate)) {
    a = EMOJI_TO_NAME[surrogate]
  }

  return colons ? `:${a}:` : a
}

const escape = str => str.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&')

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

const baseRules = {
  newline: SimpleMarkdown.defaultRules.newline,
  paragraph: SimpleMarkdown.defaultRules.paragraph,
  escape: SimpleMarkdown.defaultRules.escape,
  link: SimpleMarkdown.defaultRules.link,
  autolink: {
    ...SimpleMarkdown.defaultRules.autolink,
    match: SimpleMarkdown.inlineRegex(/^<(https?:\/\/[^ >]+)>/)
  },
  url: SimpleMarkdown.defaultRules.url,
  strong: SimpleMarkdown.defaultRules.strong,
  em: SimpleMarkdown.defaultRules.em,
  u: SimpleMarkdown.defaultRules.u,
  br: SimpleMarkdown.defaultRules.br,
  inlineCode: SimpleMarkdown.defaultRules.inlineCode,
  emoticon: {
    order: SimpleMarkdown.defaultRules.text.order,
    match: function(source) {
      return /^(¯\\_\(ツ\)_\/¯)/.exec(source)
    },
    parse: function(capture) {
      return { type: 'text', content: capture[1] }
    }
  },
  codeBlock: {
    order: SimpleMarkdown.defaultRules.codeBlock.order,
    match: source => /^```(([A-z0-9-]+?)\n+)?\n*([^]+?)\n*```/.exec(source),
    parse: ([, , lang, content]) => ({
      lang: (lang || '').trim(),
      content: content || ''
    })
  },
  emoji: {
    order: SimpleMarkdown.defaultRules.text.order,
    match: source => EMOJI_NAME_AND_DIVERSITY_RE.exec(source),
    parse([match, name]) {
      const surrogate = convertNameToSurrogate(name)
      return surrogate
        ? {
            name: `:${name}:`,
            surrogate: surrogate,
            src: getEmojiURL(surrogate)
          }
        : {
            type: 'text',
            content: match
          }
    },
    react: (node, recurseOutput, state) =>
      node.src ? (
        <Emoji
          key={state.key}
          draggable={false}
          enlarged={node.jumboable}
          alt={node.surrogate}
          src={node.src}
          {...emojiTipOptions}
        />
      ) : (
        <span key={state.key}>{node.surrogate}</span>
      )
  },
  customEmoji: {
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
        {...emojiTipOptions}
      />
    )
  },
  animatedEmoji: {
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
        {...emojiTipOptions}
      />
    )
  },
  text: {
    ...SimpleMarkdown.defaultRules.text,
    parse: ([content], recurseParse, state) =>
      state.nested
        ? { content }
        : recurseParse(translateSurrogatesToInlineEmoji(content), {
            ...state,
            nested: true
          })
  },
  s: {
    order: SimpleMarkdown.defaultRules.u.order,
    match: SimpleMarkdown.inlineRegex(/^~~([\s\S]+?)~~(?!_)/),
    parse: SimpleMarkdown.defaultRules.u.parse
  }
}

function createRules(rule) {
  const { paragraph, url, link, codeBlock, inlineCode } = rule

  return {
    // rules we don't care about:
    //  mention
    //  channel
    //  highlight

    // what is highlight?

    ...rule,
    s: {
      order: rule.u.order,
      match: SimpleMarkdown.inlineRegex(/^~~([\s\S]+?)~~(?!_)/),
      parse: rule.u.parse,
      react: (node, recurseOutput, state) => (
        <s key={state.key}>{recurseOutput(node.content, state)}</s>
      )
    },
    paragraph: {
      ...paragraph,
      react: (node, recurseOutput, state) => (
        <p key={state.key}>{recurseOutput(node.content, state)}</p>
      )
    },
    url: {
      ...url,
      match: SimpleMarkdown.inlineRegex(
        /^((https?|steam):\/\/[^\s<]+[^<.,:;"')\]\s])/
      )
    },
    link: {
      ...link,
      react: (node, recurseOutput, state) => (
        <Link
          title={node.title || astToString(node.content)}
          href={SimpleMarkdown.sanitizeUrl(node.target)}
          target="_blank"
          rel="noreferrer"
          key={state.key}
        >
          {recurseOutput(node.content, state)}
        </Link>
      )
    },
    inlineCode: {
      ...inlineCode,
      react: (node, recurseOutput, state) => (
        <Code inline={true} className="inline" key={state.key}>
          {recurse(node, recurseOutput, state)}
        </Code>
      )
    },
    codeBlock: {
      ...codeBlock,
      react(node, recurseOutput, state) {
        const { lang, content } = node
        if (lang && hljs.getLanguage(lang) !== null) {
          const { language, value } = hljs.highlight(lang, content, true)

          return (
            <Code
              key={state.key}
              language={language}
              dangerouslySetInnerHTML={{ __html: value }}
            />
          )
        }

        return <Code>{recurse(node, recurseOutput, state)}</Code>
      }
    }
  }
}

const rulesWithoutMaskedLinks = createRules({
  ...baseRules,
  link: {
    ...baseRules.link,
    match: () => null
  }
})

// used in:
//  message content (non-webhook mode)
const parse = parserFor(rulesWithoutMaskedLinks)

// used in:
//  message content (webhook mode)
//  embed description
//  embed field values
const parseAllowLinks = parserFor(createRules(baseRules))

// used in:
//  embed title (obviously)
//  embed field names
const parseEmbedTitle = parserFor(
  omit(rulesWithoutMaskedLinks, [
    'codeBlock',
    'br',
    'mention',
    'channel',
    'roleMention'
  ])
)

// used in:
//  message content
function jumboify(ast) {
  const nonEmojiNodes = ast.some(
    node =>
      node.type !== 'img' &&
      (typeof node.content !== 'string' || node.content.trim() !== '')
  )

  if (nonEmojiNodes) return ast

  const maximum = 27
  let count = 0

  ast.forEach((node, i) => {
    node.props.key = i

    if (node.type === 'img') count += 1

    if (count > maximum) return false
  })

  if (count < maximum) {
    ast.forEach(node => (node.props.className += ' jumboable'))
  }

  return ast
}

export default parseText
