import styled, { css } from 'typed-emotion'

interface Props {
  color: number
}
export const ColorPill = styled<Props, 'div'>('div')`
  width: 4px;
  background: #cacbce;
  border-radius: 3px 0 0 3px;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  background-color: ${({ color }) =>
    color
      ? `rgba(${(color >> 16) & 0xff},${(color >> 8) & 0xff},${color & 0xff},1)`
      : ''};
`
