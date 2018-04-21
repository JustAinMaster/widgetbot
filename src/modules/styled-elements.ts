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

export const Hash = styled('div')`
  background-position: 50%;
  background-repeat: no-repeat;
  opacity: 0.6;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16'%3e%3cpath fill='%23b9bbbe' d='M3.6 14l.5-2.7H1.4l.2-1.3h2.7L5 6H2.4l.2-1.3h2.7L5.7 2h1.4l-.5 2.7h4L11 2h1.3l-.5 2.7h2.7L14.4 6h-2.7l-.7 4h2.6l-.2 1.3h-2.7l-.4 2.7H8.9l.5-2.7h-4L5 14H3.6zm2.8-8l-.8 4h4l.8-4h-4z'/%3e%3c/svg%3e");
`
