import { ScrollOverlay } from 'styled-elements/scrollable'
import styled from 'typed-emotion'

interface Props {
  length: number
}

export const Suggestions = styled<Props, any>(ScrollOverlay)`
  position: absolute !important;
  left: 0;
  border-radius: 5px 5px 0 0;
  padding: 8px 0;

  bottom: ${({ theme }) =>
    theme.url.preset === 'crate' ? `100%` : `calc(100% - 5px)`};
  height: ${({ length }) =>
    (length > 9 ? 300 : length * 32) + 8 * 2}px !important;
  background-color: ${({ theme }) =>
    theme.colors._background.darken(0.05).toString()};

  & > div:nth-child(1) {
    padding: 8px 0;
  }
`
