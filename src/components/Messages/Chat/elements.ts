import styled, { css } from 'typed-emotion'

export const Root = styled('form')`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  padding-top: 5px;
  position: relative;
  margin: 0 15px 20px;
  box-shadow: 0 -1px 0 hsla(0, 0%, 100%, 0.06);

  ${({ theme }) =>
    theme.url.preset === 'crate' &&
    css`
      margin: 0;
    `};
`

export const Typing = styled('div')``

interface FieldProps {
  rows: number
}
export const Field = styled<FieldProps, 'div'>('div')`
  display: flex;
  border-radius: 5px;
  background-color: ${({ theme }) =>
    theme.colors._primary.fadeOut(0.9).toString()};
  height: ${({ rows }) => (rows > 7 ? 7 : rows) * 20 + 22}px;

  ${({ theme, rows }) =>
    theme.url.preset === 'crate' &&
    css`
      border-radius: 0;
      height: ${(rows > 7 ? 7 : rows) * 20 + 35}px;
    `};
`
