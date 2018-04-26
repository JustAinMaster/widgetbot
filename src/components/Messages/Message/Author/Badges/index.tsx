import styled, { css } from 'typed-emotion'

const base = css`
  user-select: none;
  color: #fff;
  line-height: 21px;
  font-size: 10px;
  font-weight: 500;
  vertical-align: top;
  margin-left: 3px;
`
// Bot tag
export const Tag = styled('span')`
  ${base};
  background: ${({ theme }) => theme.colors.accent};
  border-radius: 3px;
  flex-shrink: 0;
  padding: 1px 2px;
  margin-left: 6px;
  text-transform: uppercase;
`

// prettier-ignore
export const Verified = styled('a')`
  ${base};
  display: inline-block;
  cursor: pointer;
  height: 21px;
  width: 21px;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' ${({ theme }) => `fill='${encodeURIComponent(theme.colors.accent)}'`} viewBox='0 0 96 96'%3e%3cpath d='M79.2 44.2l-4.4-5.4a6.6 6.6 0 0 1-1.3-3.1l-.8-6.9a6.2 6.2 0 0 0-5.4-5.4l-6.9-.8a6 6 0 0 1-3.2-1.3l-5.4-4.4a6 6 0 0 0-7.6 0l-5.4 4.4c-.9.7-1.9 1.1-3.1 1.3l-6.9.8a6.2 6.2 0 0 0-5.4 5.4l-.8 6.9a6 6 0 0 1-1.3 3.2l-4.4 5.4a6 6 0 0 0 0 7.6l4.4 5.4c.7.9 1.1 1.9 1.3 3.1l.8 6.9a6.2 6.2 0 0 0 5.4 5.4l6.9.8a6 6 0 0 1 3.2 1.3l5.4 4.4a6 6 0 0 0 7.6 0l5.4-4.4c.9-.7 1.9-1.1 3.1-1.3l6.9-.8a6.2 6.2 0 0 0 5.4-5.4l.8-6.9a6 6 0 0 1 1.3-3.2l4.4-5.4a6.3 6.3 0 0 0 0-7.6zM41.9 64.3L27.7 50.1l6.1-6.1 8.1 8.1 20.3-20.3 6.1 6.3-26.4 26.2z'/%3e%3c/svg%3e");
`
