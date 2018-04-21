import { Link } from 'react-router-dom'
import styled, { keyframes } from 'typed-emotion'
import { Hash } from 'styled-elements'

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
export const Root = styled<Props, 'div'>(Link)`
  text-decoration: none;
  user-select: none;
  cursor: pointer;
  display: flex;
  border-radius: 3px;
  flex-direction: row;
  height: 32px;
  line-height: 32px;
  width: calc(100% - 16px);
  overflow: hidden;
  margin: 2px 8px;
  padding: 0 8px;
  background-color: ${({ selected }) =>
    selected ? '#42464D' : null} !important;
  color: ${({ selected }) => (selected ? '#f6f6f7 !important' : '#72767d')};
  animation: ${({ i }) => fade(i)} 0.5s ease;

  &:hover {
    background-color: #36393f;
    color: #b9bbbe;
  }
  &:nth-child(1) {
    margin-top: 20px;
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
  height: 100%;
  width: 16px;
  margin-right: 7px;
`
