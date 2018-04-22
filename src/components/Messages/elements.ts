import styled, { css } from 'typed-emotion'

interface Props {
  squashed: boolean
}

// prettier-ignore
export const Root = styled<Props, 'div'>('div')`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  transition: margin 0.3s ease, width 0.3s ease, box-shadow 0.2s ease;

  &::after {
    content: '';
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: 8;
    pointer-events: none;
    transition: background-color 0.5s ease;
  }

  ${({ squashed }) => squashed ? css`
    @media (min-width: 520px) {
      margin-left: 200px;
      width: calc(100% - 200px);
    }
    @media (max-width: 520px) {
      &::after {
        pointer-events: initial;
        background-color: rgba(0, 0, 0, 0.5);
      }
      * {
        pointer-events: none !important;
      }
    }
  ` : null};
`
