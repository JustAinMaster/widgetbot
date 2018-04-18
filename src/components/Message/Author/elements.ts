import styled, { css } from '../../../util/emotion'

// Root
export const Root = styled('span')``

// Username
export const Name = styled('strong')`
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0;
  &:hover {
    text-decoration: underline;
  }
`

// Bot tag
export const Tag = styled('span')`
  user-select: none;
  background: #7289da;
  color: #fff;
  border-radius: 3px;
  line-height: 21px;
  flex-shrink: 0;
  font-size: 10px;
  font-weight: 500;
  margin-left: 6px;
  padding: 1px 2px;
  text-transform: uppercase;
  vertical-align: top;
`
