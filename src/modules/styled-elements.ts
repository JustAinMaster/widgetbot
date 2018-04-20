import { Scrollbars } from 'react-custom-scrollbars'
import styled, { css } from 'typed-emotion'

const ScrollableCSS = css`
  background-color: rgba(0, 0, 0, 0.15);
  border-radius: 50px !important;
  & > div {
    cursor: default !important;
    background-color: rgba(0, 0, 0, 0.3) !important;
    border-radius: 50px !important;
    border: 3px solid #36393e;
  }
`

export const Scrollable = styled(Scrollbars)`
  display: flex;
  height: 100%;
  width: 100%;
  & > div:nth-child(3) {
    ${ScrollableCSS};
    width: 8px !important;
    & > div {
      width: 14px !important;
      margin-left: -3px !important;
    }
  }
  & * {
    color: ${({ theme }) => (theme.light ? '#2f3136' : '#fff')};
  }
`

const OverlayedScrollCSS = css`
  cursor: default !important;
  opacity: 0;
  transition: opacity 0.1s ease;
  &:hover {
    opacity: 1;
  }
`

export const OverlayedScroll = styled(Scrollbars)`
  & > div:nth-child(3) {
    & > div {
      ${OverlayedScrollCSS};
    }
  }
  & > div:hover + div + div {
    & > div {
      opacity: 1;
    }
  }
`
