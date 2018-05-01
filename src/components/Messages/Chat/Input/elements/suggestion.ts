import { Twemoji } from 'emoji'
import Color from 'kolor'
import styled, { css } from 'typed-emotion'

interface Props {
  selected: boolean
}

export const Suggestion = styled<Props, 'div'>('div')`
  display: flex;
  cursor: pointer;
  height: 32px;
  margin: 0 8px;
  font-size: 14px;
  line-height: 16px;
  border-radius: 3px;
  padding: 8px;
  ${({ selected, theme }) =>
    selected
      ? css`
          background-color: ${Color(theme.colors.primary)
            .fadeOut(0.95)
            .toString()};
        `
      : null};
`

export const Emoji = styled(Twemoji)`
  width: 16px;
  height: 16px;
  text-align: center;

  img {
    width: 100% !important;
    height: 100% !important;
    vertical-align: top !important;
  }
`

export const Name = styled('div')`
  margin-left: 10px;
`
