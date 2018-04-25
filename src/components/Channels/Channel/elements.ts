import { Link } from 'react-router-dom'
import styled, { keyframes } from 'typed-emotion'
import { Hash, Channel } from 'styled-elements'
import Color from 'kolor'

const fade = i => keyframes`
  from {
    transform: translateX(-${i * 7}px);
    opacity: 0;
  }
  to {
    transform: initial;
    opacity: 1;
  }
`

interface Props {
  selected: boolean
  to: string
  i: number
}
export const Root = styled<Props, any>(Channel)`
  text-decoration: none;
  user-select: none;
  cursor: ${({ selected }) => (selected ? 'default' : 'pointer')};
  display: flex;
  border-radius: 3px;
  flex-direction: row;
  height: 32px;
  line-height: 32px;
  width: calc(100% - 16px);
  overflow: hidden;
  margin: 2px 8px;
  padding: 0 8px;
  background-color: ${({ selected, theme }) =>
    selected
      ? `${Color(theme.colors.primary).fadeOut(0.9)} !important`
      : 'transparent'};
  color: ${({ selected, theme }) =>
    selected
      ? `${Color(theme.colors.primary)
          .fadeOut(0.1)
          .toString()} !important`
      : Color(theme.colors.primary)
          .fadeOut(0.7)
          .toString()};
  animation: ${({ i }) => fade(i)} 0.5s ease;

  &:hover {
    background-color: ${({ theme }) =>
      Color(theme.colors.primary)
        .fadeOut(0.96)
        .toString()};
    color: ${({ theme }) =>
      Color(theme.colors.primary)
        .fadeOut(0.3)
        .toString()};
  }
`

export const Name = styled('div')`
  color: inherit;
  font-size: 16px;
  font-weight: 500;
  text-overflow: ellipsis;
  width: 100%;
  overflow: hidden;
`

export const Hashtag = styled(Hash)`
  opacity: 0.6;
  height: 100%;
  width: 16px;
  margin-right: 7px;
`
