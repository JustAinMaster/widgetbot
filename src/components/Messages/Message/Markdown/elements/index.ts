import styled, { css } from 'typed-emotion'

export const Link = styled('a')`
  & code {
    color: inherit;
  }
`

export { Twemoji, Emoji } from './emoji'
export { Code } from './code'
export { Channel, Mention, Role } from './mentions'
export { Image } from './media'
