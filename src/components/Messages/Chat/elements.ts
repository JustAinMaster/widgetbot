import styled, { css } from 'typed-emotion'
import Color from 'kolor'

export const Root = styled('form')`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  margin: 0 15px 20px;
  padding-top: 5px;
  position: relative;
  box-shadow: 0 -1px 0 hsla(0, 0%, 100%, 0.06);
`

export const Typing = styled('div')``

export const Field = styled('div')`
  display: flex;
  border-radius: 5px;
  background-color: ${({ theme }) =>
    Color(theme.colors.primary)
      .fadeOut(0.9)
      .toString()};
`
