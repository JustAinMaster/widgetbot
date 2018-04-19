import styled, { css } from '../../controllers/emotion'

export const Root = styled('div')`
  /* background: #333; */
`

// Group
export const Group = styled('div')`
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  box-sizing: border-box;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  margin-left: 20px;
  margin-right: 6px;
  padding: 20px 0 13px;
  user-select: text;
  word-wrap: break-word;
`

// Avatar
interface AvatarProps {
  url: string
}

export const Avatar = styled<AvatarProps, 'div'>('div')`
  cursor: pointer;
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

// Markup
export const Markup = styled('div')`
  font-size: 0.9375rem;
  line-height: 1.1em;
  margin-top: 6px;
  white-space: pre-wrap;
  word-wrap: break-word;
  color: ${({ theme }) => (theme.light ? `#737f8d` : `hsla(0, 0%, 100%, 0.7)`)};
  & strong {
    font-weight: 700;
    color: inherit;
  }
`

// Text
export const Text = styled('div')`
  color: inherit;
  margin-bottom: 7px;
`
