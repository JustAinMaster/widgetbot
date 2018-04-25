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
`
