import * as hljs from 'highlight.js'
import * as _ from 'lodash'
import baseRules from 'shared/markdown/render/ast'
import { Code, Link, Twemoji } from 'shared/markdown/render/elements'
import { astToString, flattenAst, recurse } from 'shared/markdown/render/util'
import * as React from 'react'
import SimpleMarkdown from 'simple-markdown'

export function parseText(msg: string) {
  const mentions = (array: [string | string[]]) =>
    array.map(e => {
      if (typeof e !== 'string') return e

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

  try {
    return msg ? emoji(mentions(parse(msg))) : null
  } catch (e) {
    console.error(`Failed to parse "${msg}"`, e)
    return msg
  }
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

function createRules(rule: { [key: string]: any }) {
  const { paragraph, url, link, codeBlock, inlineCode } = rule

  return {
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

const parse = parserFor(rulesWithoutMaskedLinks)

export const parseAllowLinks = parserFor(createRules(baseRules))

export const parseEmbedTitle = parserFor(
  _.omit(rulesWithoutMaskedLinks, [
    'codeBlock',
    'br',
    'mention',
    'channel',
    'roleMention'
  ])
)

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
