import styled, { css } from './ThemeContext'

export const Root = styled('div')``

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

  &.join {
    padding: 15px 0;
  }
`

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
        `}
`

export const Content = styled('div')`
  flex-grow: 1;
  margin-right: 20px;
`

export const JoinText = styled('span')`
  padding-left: 26px;
  background-repeat: no-repeat;
  background-position: left center;
  background-size: 18px;
  color: ${({ theme }) => theme.colors._primary.fadeOut(0.4).toString()};
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 18 18'%3e%3cg fill='none' fill-rule='evenodd'%3e%3cpath d='M18 0H0v18h18z'/%3e%3cpath fill='%2343B581' d='M0 8h14.2l-3.6-3.6L12 3l6 6-6 6-1.4-1.4 3.6-3.6H0'/%3e%3c/g%3e%3c/svg%3e");
`

export const JoinMember = styled('a')`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`

export const Markup = styled('div')`
  font-size: 0.9375rem;
  line-height: 1.1em;
  margin-top: 4px;
  white-space: pre-wrap;
  word-wrap: break-word;
`

export const Reactions = styled('div')``

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
