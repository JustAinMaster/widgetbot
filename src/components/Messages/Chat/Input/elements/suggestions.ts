import styled, { css } from 'typed-emotion'
import { OverlayedScroll } from 'styled-elements'
import Color from 'kolor'

interface Props {
  length: number
}

export const Suggestions = styled<Props, any>(OverlayedScroll)`
  position: absolute !important;
  left: 0;
  bottom: calc(100% - 10px);
  height: ${({ length }) =>
    (length > 9 ? 300 : length * 32) + 8 * 2}px !important;
  background-color: ${({ theme }) =>
    Color(theme.colors.background)
      .darken(0.05)
      .toString()};
  border-radius: 5px 5px 0 0;
  padding: 8px 0;

  & > div:nth-child(1) {
    padding: 8px 0;
  }
`
