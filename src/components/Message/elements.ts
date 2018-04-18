import styled, { css } from '../../util/emotion'

export const Root = styled('div')`
  /* background: #333; */
`

// Group
export const Group = styled('div')`
  border-bottom: 1px solid #eceeef;
  box-sizing: border-box;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  margin-left: 20px;
  margin-right: 6px;
  padding: 20px 0;
  user-select: text;
  word-wrap: break-word;
`

// Avatar
interface AvatarProps {
  url: string
}

export const Avatar = styled<AvatarProps, 'div'>('div')`
  background-image: url('${props => props.url}');
  border-radius: 50%;
  ${({ theme }) =>
    theme.compact
      ? css``
      : css`
          background-size: 40px 40px;
          height: 40px;
          width: 40px;
          margin-right: 20px;
          margin-top: -2px;
        `}
`

// Content
export const Content = styled('div')`
  flex-grow: 1;
  margin-right: 20px;
`

// Text
export const Text = styled('div')`
`
