import * as React from 'react'
import emoji from 'react-easy-emoji'
import { Emote } from 'styled-elements/Emoji/elements'
import { cx } from 'emotion'

const Emoji = ({ children, text, className, src }: any) => {
  if (children && !text) text = children

  if (src) {
    return <Emote src={src} className={cx('emoji', className)} />
  }

  if (typeof text !== 'string') {
    if (text === null || undefined) {
      return null
    }
    throw new Error(
      `Emoji component expects string as input to be a string, received ${text}`
    )
  }

  return emoji(text, (code, string, key) => (
    <Emote
      src={`https://twitter.github.io/twemoji/2/svg/${code}.svg`}
      alt={string}
      onError={event => {
        const img = event.currentTarget
        img.classList.add('error')
      }}
      className={cx('emoji', className)}
      key={key}
    />
  ))
}

export default Emoji
