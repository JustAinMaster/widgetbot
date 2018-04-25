import * as React from 'react'
import Embed from './Embed'
import message from '../../../types/message'

export function parseText(msg: message) {
  function hexToRgb(hex: string): { r: string; g: string; b: string } {
    let result: any = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    result = result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        }
      : {}
    // Default role color #000000
    if (!result.r && !result.g && !result.b)
      result = {
        r: 185,
        g: 187,
        b: 190
      }
    return result
  }

  function mentions(array: [string | string[]], mentions) {
    return array.map(e => {
      if (typeof e !== 'string') {
        return e
      }

      mentions.members.forEach((member, i) => {
        e = replace(
          e,
          new RegExp(`<@!*${member.id}>`, 'g'),
          <span
            key={Math.random() * i}
            // onClick={() => props.setUserPopup(member)}
            className="memberMention"
          >
            @{member.name}
          </span>
        )
      })

      mentions.channels.forEach((channel, i) => {
        e = replace(
          e,
          `<#${channel.id}>`,
          <span key={Math.random() * i} className="memberMention">
            #{channel.name}
          </span>
        )
      })

      mentions.roles.forEach((role, i) => {
        let color = hexToRgb(role.color)
        e = replace(
          e,
          `<@&${role.id}>`,
          <span
            key={Math.random() * i}
            style={{ backgroundColor: `${color.r}, ${color.g}, ${color.b}` }}
          >
            <span className="roleMention">@{role.name}</span>
          </span>
        )
      })

      let _e: string[] | string = e as string[] | string
      if (_e instanceof Array) {
        _e.map(a => {
          if (typeof a !== 'string') {
            return a
          }
          return a.replace(/<@&[0-9]{18}>/g, '@deleted-role')
        })
      } else {
        e = e.replace(/<@&[0-9]{18}>/g, '@deleted-role')
      }

      if (mentions.everyone) {
        e = replace(
          e,
          '@everyone',
          <span key={Math.random()} className="everyoneMention">
            @everyone
          </span>
        )
        e = replace(
          e,
          '@here',
          <span key={Math.random()} className="everyoneMention">
            @here
          </span>
        )
      }

      return e
    })
  }

  function replace(string, regex, element) {
    if (string instanceof Array) {
      return string.map(e => replace(e, regex, element))
    } else if (typeof string === 'string') {
      var parts = string.split(regex)

      for (var i = 1; i < parts.length; i += 2) {
        parts.splice(i, 0, element)
      }

      return parts
    } else {
      return string
    }
  }

  function attachment(msg, setPopup?) {
    if (msg.attachment.url)
      return (
        <span
          onClick={() => {
            // setPopup(msg.attachment.url)
          }}
        >
          <img
            className="msg-img"
            src={msg.attachment.url}
            height={msg.attachment.height}
          />
        </span>
      )
    else return null
  }

  function embed(msg: message) {
    if (msg.embeds.length === 0) {
      return null
    }

    return msg.embeds.map((embed, i) => {
      if (embed.type === 'gifv') {
        return (
          <img
            className="msg-img"
            src={embed.video.url.replace('.mp4', '.gif')}
            height={embed.video.height}
            key={i}
            onClick={() => {
              // props.setPopup(embed.video.url.replace('.mp4', '.gif'))
            }}
          />
        )
      } else {
        return <Embed key={i} {...embed} />
      }
    })
  }

  function emoji(input) {
    return input.map((part, i) => {
      if (typeof part === 'string') {
        return (
          <Twemoji
            svg
            onlyEmojiClassName="jumboable"
            className="emoji"
            text={part}
          />
        )
      } else {
        return part
      }
    })
  }

  return (
    <div>
      {msg.content ? emoji(mentions(parse(msg.content), msg.mentions)) : null}
      {attachment(msg)}
      {embed(msg)}
    </div>
  )
}

/*
The MIT License (MIT)

Copyright (c) 2017 leovoel

Permission is hereby granted, free of charge, to any person obtaining a
copy of this software and associated documentation files (the "Software"),
to deal in the Software without restriction, including without limitation
the rights to use, copy, modify, merge, publish, distribute, sublicense,
and/or sell copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
DEALINGS IN THE SOFTWARE.
*/

import SimpleMarkdown from 'simple-markdown'
import * as hljs from 'highlight.js'
import { Twemoji } from 'react-emoji-render'
// import Emoji from "./emoji"
var Emoji = { people: [{ names: ['disabled'], surrogates: '😀' }] }

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

// this function seems to be duplicated quite a bit in the original source...
function createReactElement(type, props, key?, ...children) {
  const defaultProps = type && type.defaultProps

  if (props && defaultProps) {
    for (const prop in defaultProps) {
      if (props[prop] === undefined) {
        props[prop] = defaultProps[prop]
      }
    }
  } else if (!props) {
    props = defaultProps || {}
  }

  props.children = children[0]
  if (children.length > 1) {
    props.children = children
  }

  return {
    $$typeof: Symbol.for('react.element'),
    type: type,
    key: key == null ? null : `${key}`,
    ref: null,
    props: props,
    _owner: null
  }
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

function makeClassName(...parameters) {
  const result = []

  for (const parameter of parameters) {
    if (parameter) {
      if (typeof parameter === 'string' || typeof parameter === 'number') {
        result.push(parameter)
      } else if (typeof parameter === 'object') {
        for (const key in parameter) {
          if (parameter.hasOwnProperty(key) && parameter[key]) {
            result.push(key)
          }
        }
      }
    }
  }

  return result.join(' ')
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

const getEmoteURL = emote =>
  `${location.protocol}//cdn.discordapp.com/emojis/${emote.id}.png`

function getEmojiURL(surrogate) {
  if (['™', '©', '®'].indexOf(surrogate) > -1) {
    return ''
  }

  try {
    // we could link to discord's cdn, but there's a lot of these
    // and i'd like to minimize the amount of data we need directly from them
    return `https://twemoji.maxcdn.com/2/svg/${Twemoji.convert.toCodePoint(
      surrogate
    )}.svg`
  } catch (error) {
    return ''
  }
}

// emoji lookup tables

const DIVERSITY_SURROGATES = ['🏻', '🏼', '🏽', '🏾', '🏿']
const NAME_TO_EMOJI = {}
const EMOJI_TO_NAME = {}

Object.keys(Emoji).forEach(category => {
  Emoji[category].forEach(emoji => {
    EMOJI_TO_NAME[emoji.surrogates] = emoji.names[0] || ''

    emoji.names.forEach(name => {
      NAME_TO_EMOJI[name] = emoji.surrogates

      DIVERSITY_SURROGATES.forEach((d, i) => {
        NAME_TO_EMOJI[`${name}::skin-tone-${i + 1}`] = emoji.surrogates.concat(
          d
        )
      })
    })

    DIVERSITY_SURROGATES.forEach((d, i) => {
      const surrogates = emoji.surrogates.concat(d)
      const name = emoji.names[0] || ''

      EMOJI_TO_NAME[surrogates] = `${name}::skin-tone-${i + 1}`
    })
  })
})

const EMOJI_NAME_AND_DIVERSITY_RE = /^:([^\s:]+?(?:::skin-tone-\d)?):/

function convertNameToSurrogate(name, t = '') {
  // what is t for?
  return NAME_TO_EMOJI.hasOwnProperty(name) ? NAME_TO_EMOJI[name] : t
}

function convertSurrogateToName(surrogate, colons = true, n = '') {
  // what is n for?
  let a = n

  if (EMOJI_TO_NAME.hasOwnProperty(surrogate)) {
    a = EMOJI_TO_NAME[surrogate]
  }

  return colons ? `:${a}:` : a
}

const escape = str => str.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&')

const replacer = (function() {
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

// i am not sure why are these rules split like this.

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
    match(source) {
      return /^```(([A-z0-9-]+?)\n+)?\n*([^]+?)\n*```/.exec(source)
    },
    parse(capture) {
      return { lang: (capture[2] || '').trim(), content: capture[3] || '' }
    }
  },
  emoji: {
    order: SimpleMarkdown.defaultRules.text.order,
    match(source) {
      return EMOJI_NAME_AND_DIVERSITY_RE.exec(source)
    },
    parse(capture) {
      const match = capture[0]
      const name = capture[1]
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
    react(node, recurseOutput, state) {
      return node.src
        ? createReactElement(
            'img',
            {
              draggable: false,
              className: makeClassName('emoji', { jumboable: node.jumboable }),
              alt: node.surrogate,
              'data-tip': node.name,
              src: node.src,
              ...emojiTipOptions
            }
          )
        : createReactElement('span', {}, state.key, node.surrogate)
    }
  },
  customEmoji: {
    order: SimpleMarkdown.defaultRules.text.order,
    match(source) {
      return /^<:(\w+):(\d+)>/.exec(source)
    },
    parse(capture) {
      const name = capture[1]
      const id = capture[2]
      return {
        emojiId: id,
        // NOTE: we never actually try to fetch the emote
        // so checking if colons are required (for 'name') is not
        // something we can do to begin with
        name: name,
        src: getEmoteURL({
          id: id
        })
      }
    },
    react(node) {
      return createReactElement(
        'img',
        {
          draggable: false,
          className: makeClassName('emoji', { jumboable: node.jumboable }),
          alt: `<:${node.name}:${node.emojiId}>`,
          'data-tip': `:${node.name}:`,
          src: node.src,
          ...emojiTipOptions
        }
      )
    }
  },
  text: {
    ...SimpleMarkdown.defaultRules.text,
    parse(capture, recurseParse, state) {
      return state.nested
        ? {
            content: capture[0]
          }
        : recurseParse(translateSurrogatesToInlineEmoji(capture[0]), {
            ...state,
            nested: true
          })
    }
  },
  s: {
    order: SimpleMarkdown.defaultRules.u.order,
    match: SimpleMarkdown.inlineRegex(/^~~([\s\S]+?)~~(?!_)/),
    parse: SimpleMarkdown.defaultRules.u.parse
  }
}

function escaped(data) {
  data = data.replace(/</gim, '&lt;')
  data = data.replace(/>/gim, '&gt;')
  return data
}

function createRules(r) {
  const paragraph = r.paragraph
  const url = r.url
  const link = r.link
  const codeBlock = r.codeBlock
  const inlineCode = r.inlineCode

  return {
    // rules we don't care about:
    //  mention
    //  channel
    //  highlight

    // what is highlight?

    ...r,
    s: {
      order: r.u.order,
      match: SimpleMarkdown.inlineRegex(/^~~([\s\S]+?)~~(?!_)/),
      parse: r.u.parse,
      react(node, recurseOutput, state) {
        return createReactElement(
          's',
          {},
          state.key,
          recurseOutput(node.content, state)
        )
      }
    },
    paragraph: {
      ...paragraph,
      react(node, recurseOutput, state) {
        return createReactElement(
          'p',
          {},
          state.key,
          recurseOutput(node.content, state)
        )
      }
    },
    url: {
      ...url,
      match: SimpleMarkdown.inlineRegex(
        /^((https?|steam):\/\/[^\s<]+[^<.,:;"')\]\s])/
      )
    },
    link: {
      ...link,
      react(node, recurseOutput, state) {
        // this contains some special casing for invites (?)
        // or something like that.
        // we don't really bother here
        const children = recurseOutput(node.content, state)
        const title = node.title || astToString(node.content)
        return createReactElement(
          'a',
          {
            title: title,
            href: SimpleMarkdown.sanitizeUrl(node.target),
            target: '_blank',
            rel: 'noreferrer'
          },
          state.key,
          children
        )
      }
    },
    inlineCode: {
      ...inlineCode,
      react(node, recurseOutput, state) {
        return createReactElement(
          'code',
          {
            className: 'inline'
          },
          state.key,
          recurse(node, recurseOutput, state)
        )
      }
    },
    codeBlock: {
      ...codeBlock,
      react(node, recurseOutput, state) {
        if (node.lang && hljs.getLanguage(node.lang) != null) {
          const highlightedBlock = hljs.highlight(node.lang, node.content, true)
          return createReactElement(
            'pre',
            {},
            state.key,
            createReactElement(
              'code',
              {
                className: 'hljs ' + highlightedBlock.language,
                dangerouslySetInnerHTML: {
                  __html: highlightedBlock.value
                }
              }
            )
          )
        }

        return createReactElement(
          'pre',
          {},
          state.key,
          createReactElement(
            'code',
            {
              className: 'hljs'
            },
            undefined,
            recurse(node, recurseOutput, state)
          )
        )
      }
    }
  }
}

const rulesWithoutMaskedLinks = createRules({
  ...baseRules,
  link: {
    ...baseRules.link,
    match() {
      return null
    }
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
  const nonEmojiNodes = ast.some(node => {
    return (
      node.type !== 'img' &&
      (typeof node.content !== 'string' || node.content.trim() !== '')
    )
  })

  if (nonEmojiNodes) {
    return ast
  }

  const maximum = 27
  let count = 0

  ast.forEach((node, i) => {
    node.props.key = i

    if (node.type === 'img') {
      count += 1
    }

    if (count > maximum) {
      return false
    }
  })

  if (count < maximum) {
    ast.forEach(node => (node.props.className += ' jumboable'))
  }

  return ast
}

export { parse, parseAllowLinks, parseEmbedTitle, jumboify }
