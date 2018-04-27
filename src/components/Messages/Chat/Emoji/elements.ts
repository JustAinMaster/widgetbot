import styled, { css } from 'typed-emotion'
import { Twemoji } from 'emoji'

export const Root = styled('form')`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  margin: 0 15px 20px;
  padding-top: 5px;
  position: relative;
  box-shadow: 0 -1px 0 hsla(0, 0%, 100%, 0.06);
`

interface EmojiProps {
  hover: boolean
}
export const Emoji = styled<EmojiProps, any>(Twemoji)`
  cursor: pointer;
  opacity: 0.3;
  filter: grayscale(100%);
  transition: transform 0.1s ease-in-out, opacity 0.1s ease-in-out,
    filter 0.1s ease-in-out;

  ${({ hover }) =>
    hover
      ? css`
          opacity: 1;
          filter: initial;
          transform: scale(1.3);
        `
      : null};
`
