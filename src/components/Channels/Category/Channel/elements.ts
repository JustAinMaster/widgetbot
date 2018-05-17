import Channel, { Hash } from 'styled-elements/channel'
import styled, { keyframes } from 'typed-emotion'

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
  order: number
}
export const Root = styled<Props, any>(Channel)`
  text-decoration: none;
  user-select: none;
  cursor: ${({ selected }) => (selected ? 'default' : 'pointer')};
  display: flex;
  border-radius: 3px;
  flex-direction: row;
  font-size: 16px;
  font-weight: 500;
  height: 32px;
  line-height: 32px;
  width: calc(100% - 16px);
  overflow: hidden;
  margin: 2px 8px;
  padding: 0 8px;
  background-color: ${({ selected, theme }) =>
    selected
      ? `${theme.colors._primary.fadeOut(0.9)} !important`
      : 'transparent'};
  color: ${({ selected, theme }) =>
    selected
      ? `${theme.colors._primary.fadeOut(0.1).toString()} !important`
      : theme.colors._primary.fadeOut(0.7).toString()};
  /* animation: ${({ order }) => fade(order)} 0.5s ease; */

  &:hover {
    background-color: ${({ theme }) =>
      theme.colors._primary.fadeOut(0.96).toString()};
    color: ${({ theme }) => theme.colors._primary.fadeOut(0.3).toString()};
  }

  @media (max-width: 400px), (max-height: 340px) {
    height: 28px;
    line-height: 28px;
    font-size: 14px;
  }
`

export const Name = styled('div')`
  color: inherit;
  font-size: inherit;
  font-weight: inherit;
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
