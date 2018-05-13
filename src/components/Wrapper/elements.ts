import styled, { css } from 'typed-emotion'

interface Props {
  squashed: boolean
  onClick?: any
}

// prettier-ignore
export const Wrapper = styled<Props, 'div'>('div')`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  transition: margin 0.3s ease, width 0.3s ease;

  &::after {
    content: '';
    top: 0;
    left: 0;
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: 8;
    pointer-events: none;
    transition: opacity 0.5s ease;
    will-change: opacity;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: 0;
  }

  ${({ squashed }) => squashed ? css`
    @media (min-width: 521px) {
      margin-left: 200px;
      width: calc(100% - 200px);
    }
    @media (max-width: 520px) {
      &::after {
        pointer-events: initial;
        opacity: 1;
      }
      * {
        pointer-events: none !important;
      }
    }
  ` : null};
`
