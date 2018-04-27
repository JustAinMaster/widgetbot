import styled, { css } from 'typed-emotion'

export const Root = styled('div')`
  width: 100%;
`

export const Input = styled('textarea')`
  width: 100%;
  height: 100%;
  padding: 10px 16px;
  background-color: transparent;
  border: none;
  resize: none;
  outline: none;
  font-size: 0.9375rem;
  font-weight: 400;
  letter-spacing: -0.025rem;
  line-height: 1.25rem;
`

export { Suggestion, Emoji, Name } from './suggestion'
export { Suggestions } from './suggestions'
