import styled, { css } from 'typed-emotion'
import { Twemoji as EmojiParser } from 'react-emoji-render'

interface Props {
  enlarged?: boolean
}

const emoji = (enlarged: boolean) => css`
  object-fit: contain;
  margin: 0 !important;

  ${enlarged
    ? css`
        height: 34px !important;
        width: 34px !important;
        margin-bottom: 5px;
        vertical-align: bottom !important;
      `
    : css`
        width: 22px !important;
        height: 22px !important;
        vertical-align: -0.4em !important;
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
