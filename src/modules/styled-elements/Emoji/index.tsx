import * as React from 'react'
import emoji from '@widgetbot/react-easy-emoji'
import { Emote } from 'styled-elements/Emoji/elements'
import { cx } from 'emotion'
import emojiMap from 'styled-elements/Emoji/emojiMap'

const cache = new Map<string, string>()

interface Props {
  [key: string]: any
  children?: string
  text?: string
  className?: string
  resolveNames?: boolean
  onlyEmojiClassName?: string
  src?: string
}

class Emoji extends React.PureComponent<Props> {
  render() {
    let { text } = this
    let { className, resolveNames, onlyEmojiClassName, src } = this.props

    // Return a custom emoji
    if (src) {
      return <Emote src={src} className={cx('emoji', className)} />
    }

    // Validate props
    if (typeof text !== 'string') {
      if (text === null || typeof text === 'undefined') {
        return null
      }
      throw new Error(
        `Emoji component expects string as input to be a string, received ${text}`
      )
    }

    // Resolve all text representations of emojis
    // uses a cache store to reduce
    if (resolveNames) {
      text = this.resolve(text)
    }

    const resolved = emoji(text, (code, string, key) => (
      <Emote
        src={`https://twitter.github.io/twemoji/2/svg/${code}.svg`}
        alt={string}
        onError={this.handleError.bind(this)}
        className={cx('emoji', className)}
        key={key}
      />
    ))

    return this.jumbofy(resolved)
  }

  get text() {
    let { children, text } = this.props
    return children && !text ? children : text
  }

  resolve(text: string) {
    if (cache.has(text)) {
      return cache.get(text)
    }

    let parsed = text
    for (let keyword of Object.keys(emojiMap)) {
      parsed = parsed.split(`:${keyword}:`).join(emojiMap[keyword])
    }
    cache.set(text, parsed)
    return parsed
  }

  handleError(event) {
    const img = event.currentTarget
    img.classList.add('error')
  }

  jumbofy(fragment: any[]) {
    const { onlyEmojiClassName } = this.props

    if (onlyEmojiClassName) {
      // Iterate through all fragment elements
      // until a either the fragment is not an object
      // and it's string contains characters other than
      // a space (or line break)
      const onlyEmoji = !fragment.find(
        fragment => !(fragment instanceof Object || !/\S/.test(fragment))
      )

      if (onlyEmoji) {
        return fragment.map(
          piece =>
            piece instanceof Object
              ? React.cloneElement(piece, {
                  className: cx(onlyEmojiClassName, piece.props.className)
                })
              : piece
        )
      }
    }

    return fragment
  }
}

export default Emoji
