import styled, { css } from 'typed-emotion'
import Color from 'kolor'

export const Root = styled('div')``

// Group
export const Group = styled('div')`
  border-bottom: 1px solid ${({ theme }) => Color(theme.styles.color).fadeOut(0.96).toString()};
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
  color: ${({ theme }) =>
    Color(theme.styles.color)
      .fadeOut(0.3)
      .toString()};
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
