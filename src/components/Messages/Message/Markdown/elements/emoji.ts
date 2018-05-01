import { Twemoji as EmojiParser } from 'react-emoji-render'
import styled, { css } from 'typed-emotion'

interface Props {
  enlarged?: boolean
}

const emoji = (enlarged: boolean) => css`
  object-fit: contain;

  ${enlarged
    ? css`
        height: 34px !important;
        width: 34px !important;
        margin: 3px 1px !important;
        vertical-align: bottom !important;
      `
    : css`
        width: 22px !important;
        height: 22px !important;
        vertical-align: -0.4em !important;
        margin: 0 !important;
      `};
`

export const Emoji = styled<Props, 'img'>('img')`
  ${({ enlarged }) => emoji(enlarged)};
`

export const Twemoji = styled(EmojiParser)`
  & img {
    ${emoji(false)};
  }
  &.enlarged img {
    ${emoji(true)};
  }
`
