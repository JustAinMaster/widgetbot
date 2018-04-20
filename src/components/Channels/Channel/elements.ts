import styled from 'typed-emotion'

interface Props {
  active: boolean
}
export const Root = styled<Props, 'div'>('div')`
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
  background-color: ${({ active }) => (active ? '#42464D' : null)} !important;
  color: ${({ active }) => (active ? '#f6f6f7 !important' : '#72767d')};
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
`

export const Hashtag = styled('div')`
  height: 100%;
  width: 16px;
  background-position: 50%;
  background-repeat: no-repeat;
  margin-right: 7px;
  opacity: 0.6;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16'%3e%3cpath fill='%23b9bbbe' d='M3.6 14l.5-2.7H1.4l.2-1.3h2.7L5 6H2.4l.2-1.3h2.7L5.7 2h1.4l-.5 2.7h4L11 2h1.3l-.5 2.7h2.7L14.4 6h-2.7l-.7 4h2.6l-.2 1.3h-2.7l-.4 2.7H8.9l.5-2.7h-4L5 14H3.6zm2.8-8l-.8 4h4l.8-4h-4z'/%3e%3c/svg%3e");
`
