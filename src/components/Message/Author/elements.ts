import styled, { css } from '../../../controllers/emotion'

// Root
export const Root = styled('span')``

// Username
interface NameProps {
  color: string
}

export const Name = styled<NameProps, 'strong'>('strong')`
  color: ${({ color }) => (color !== '#000000' ? color : null)};
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

// Timestamp
export const Time = styled('span')`
  line-height: 21px;
  color: hsla(0, 0%, 100%, 0.2);
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 0;
  margin-left: 6px;
  text-transform: none;
`
