import styled, { css } from './ThemeContext'

export const Root = styled('div')``

// Group
// prettier-ignore
export const Group = styled('div')`
  border-bottom: 1px solid ${({ theme }) => theme.colors._primary.fadeOut(0.96).toString()};
  box-sizing: border-box;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  width: calc(100% - 10px - 20px);
  margin-left: 20px;
  margin-right: 10px;
  padding: 20px 0 13px;
  user-select: text;
  word-wrap: break-word;
`

// Avatar
interface AvatarProps {
  url: string
}

export const Avatar = styled<AvatarProps, 'div'>('div')`
  flex-shrink: 0;
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
`

// Text
export const Text = styled('div')`
  color: ${({ theme }) => theme.colors._primary.fadeOut(0.3).toString()};
  margin-bottom: 7px;
  opacity: ${({ theme }) => (theme.message.type === 'SENDING' ? 0.5 : 1)};

  & * {
    color: inherit;
  }

  & a {
    color: #0096cf;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  & strong {
    font-weight: 700;
    color: inherit;
  }
`
