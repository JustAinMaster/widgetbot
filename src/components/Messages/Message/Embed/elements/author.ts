import styled, { css } from 'typed-emotion'

export const Author = styled('div')`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`

export const AuthorName = styled('span')`
  display: inline-block;
  font-weight: 500;
  font-size: 14px;
  color: hsla(0, 0%, 100%, 1);
`

export const AuthorIcon = styled('img')`
  margin-right: 9px;
  width: 20px;
  height: 20px;
  object-fit: contain;
  border-radius: 50%;
`
